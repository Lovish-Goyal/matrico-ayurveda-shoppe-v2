const Disease = require("../models/disease");
const Product = require("../models/product");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Emergency keywords that trigger immediate disclaimer
const EMERGENCY_KEYWORDS = [
  "chest pain",
  "heart attack",
  "difficulty breathing",
  "shortness of breath",
  "severe bleeding",
  "stroke",
  "unconscious",
  "poisoning",
  "suicide",
  "self harm",
  "broken bone",
  "fracture"
];

const checkEmergency = (query) => {
  const lowerQuery = query.toLowerCase();
  return EMERGENCY_KEYWORDS.some((keyword) => lowerQuery.includes(keyword));
};

// Local lookup fallback generator when API key is missing or network fails
const generateLocalFallback = (query, matchedDiseases, lang) => {
  if (matchedDiseases.length === 0) {
    return lang === "hi"
      ? "🌿 नमस्ते! आपकी खोज के लिए हमारे डेटाबेस में कोई सीधा परिणाम नहीं मिला। कृपया अपने भोजन में ताजी जड़ी-बूटियों (तुलसी, अदरक, जीरा) का उपयोग करें और संतुलित दिनचर्या अपनाएं। विस्तृत सलाह के लिए किसी आयुर्वेदिक चिकित्सक से परामर्श लें।"
      : "🌿 Namaste! I couldn't find an exact match in our local database for your query. Traditionally, Ayurveda recommends focusing on freshly prepared warm meals, keeping your Doshas in check with daily routines (like drinking warm lemon water), and consulting a local Ayurvedic doctor for a tailored diagnosis.";
  }

  const d = matchedDiseases[0];
  if (lang === "hi") {
    return `🌿 (डेटाबेस रिप्लाई): **${d.name}** के संबंध में प्राचीन आयुर्वेदिक सिद्धांतों के अनुसार निम्नलिखित सलाह दी जाती है:
- **उपयोगी जड़ी-बूटियाँ:** ${d.herbs.join(", ")}
- **आयुर्वेदिक उपचार:** ${d.ayurvedicUpchar.join("\n")}
- **अनुशंसित औषधि:** ${d.medicineName || "कोई विशिष्ट औषधि अनुशंसित नहीं है"}
- **उपयोग विधि:** ${d.usage.join(", ")}
- **अवधि:** ${d.duration.join(", ")}

*अस्वीकरण: यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।*`;
  }

  return `🌿 (Local Database Search): Based on ancient Ayurvedic guidelines for **${d.name}**, here are some wellness insights:
- **Recommended Herbs:** ${d.herbs.join(", ")}
- **Traditional Treatment (Upchar):** ${d.ayurvedicUpchar.join("\n")}
- **Ayurvedic Formulation:** ${d.medicineName || "N/A"}
- **How to Use:** ${d.usage.join(", ")}
- **Duration:** ${d.duration.join(", ")}

*Disclaimer: This information is educational and is not a substitute for professional medical advice, diagnosis, or treatment.*`;
};

exports.consult = async (req, res) => {
  try {
    const { query, lang = "en" } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Query is required." });
    }

    // 1. Check for emergency keywords
    if (checkEmergency(query)) {
      return res.status(200).json({
        reply:
          lang === "hi"
            ? "⚠️ यह एक आपातकालीन स्थिति हो सकती है। कृपया तुरंत अपने नजदीकी अस्पताल या आपातकालीन चिकित्सा सेवाओं से संपर्क करें। आयुर्वेदिक उपचार आपातकालीन स्थितियों का विकल्प नहीं हैं।"
            : "⚠️ This query suggests a potential medical emergency. Please contact your local emergency services (like 911 or emergency healthcare providers) immediately. Ayurvedic remedies are not substitutes for acute emergency care.",
        isEmergency: true,
        disclaimer: "Emergency alert triggered.",
        relatedHerbs: [],
        recommendedProducts: [],
      });
    }

    // 2. Fetch context from the local database
    const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 2);
    let matchedDiseases = [];
    if (keywords.length > 0) {
      const regexConditions = keywords.map(kw => ({
        $or: [
          { name: { $regex: kw, $options: "i" } },
          { herbs: { $regex: kw, $options: "i" } },
          { medicineName: { $regex: kw, $options: "i" } }
        ]
      }));
      matchedDiseases = await Disease.find({ $or: regexConditions }).limit(2);
    }

    // Build context text from matches
    let contextText = "";
    let recommendedProducts = [];
    if (matchedDiseases.length > 0) {
      contextText = "Here is relevant information from our validated database:\n";
      for (const d of matchedDiseases) {
        contextText += `- Disease: ${d.name}\n  Herbs: ${d.herbs.join(", ")}\n  Traditional treatment: ${d.ayurvedicUpchar.join("; ")}\n`;
        if (d.medicineName) {
          const p = await Product.findOne({ name: { $regex: d.medicineName, $options: "i" } });
          if (p) {
            recommendedProducts.push(p);
          }
        }
      }
    }

    // 3. Check for API key presence
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Missing Gemini API Key in backend environment. Triggering local database lookup.");
      const fallbackText = generateLocalFallback(query, matchedDiseases, lang);
      return res.status(200).json({
        reply: fallbackText,
        isEmergency: false,
        disclaimer: "This information is educational and is not a substitute for professional medical advice, diagnosis, or treatment.",
        relatedHerbs: matchedDiseases.flatMap((d) => d.herbs) || [],
        recommendedProducts,
      });
    }

    const prompt = `
You are a secure, educational Ayurvedic wellness assistant. 
Only provide guidance based on traditional Ayurvedic principles. 

STRICT RULES:
- DO NOT diagnose the user or make concrete clinical claims.
- DO NOT present your advice as professional medical treatment or recommendations.
- Keep the tone educational, holistic, and focused on wellness balance (Doshas, herbs, diet, lifestyle).
- If the query mentions any critical disease, advise consulting an Ayurvedic practitioner or primary care physician.
- Include a standard disclaimer: "This information is educational and is not a substitute for professional medical advice."

Context from our database:
${contextText || "No specific database matches found for this query."}

User query: "${query}"
Answer in the requested language code: ${lang}
`;

    // 4. Call Gemini API via native fetch
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error status: ${response.status}`);
      }

      const data = await response.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

      res.status(200).json({
        reply: aiText,
        isEmergency: false,
        disclaimer: "This information is educational and is not a substitute for professional medical advice, diagnosis, or treatment.",
        relatedHerbs: matchedDiseases.flatMap((d) => d.herbs) || [],
        recommendedProducts,
      });
    } catch (fetchErr) {
      console.error("Gemini fetch failed, triggering local fallback:", fetchErr.message);
      const fallbackText = generateLocalFallback(query, matchedDiseases, lang);
      res.status(200).json({
        reply: fallbackText,
        isEmergency: false,
        disclaimer: "This information is educational and is not a substitute for professional medical advice, diagnosis, or treatment.",
        relatedHerbs: matchedDiseases.flatMap((d) => d.herbs) || [],
        recommendedProducts,
      });
    }
  } catch (error) {
    console.error("Consult error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

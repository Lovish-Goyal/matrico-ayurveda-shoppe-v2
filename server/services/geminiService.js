const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Fetch helper with retry logic for 429 and 5xx errors
const fetchWithRetry = async (url, options = {}, maxRetries = 3, initialDelay = 1000) => {
  let retries = 0;
  while (true) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return response;
      }
      
      // Retry on rate limit or server error
      const isRetriable = response.status === 429 || (response.status >= 500 && response.status < 600);
      if (isRetriable && retries < maxRetries) {
        retries++;
        // Exponential backoff with jitter
        const delay = initialDelay * Math.pow(2, retries - 1) + Math.random() * 200;
        console.warn(`Gemini API returned status ${response.status}. Retrying in ${Math.round(delay)}ms... (Attempt ${retries}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      
      throw new Error(`Gemini API error status: ${response.status}`);
    } catch (err) {
      // Retry on network errors
      if (retries < maxRetries) {
        retries++;
        const delay = initialDelay * Math.pow(2, retries - 1) + Math.random() * 200;
        console.warn(`Gemini API fetch error: ${err.message}. Retrying in ${Math.round(delay)}ms... (Attempt ${retries}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
};

// Generate content using Gemini API
const generateGeminiResponse = async (prompt) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Gemini API key is missing.");
      return null;
    }

    const response = await fetchWithRetry(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Error in generateGeminiResponse:", error.message);
    return null;
  }
};

module.exports = {
  generateGeminiResponse,
};

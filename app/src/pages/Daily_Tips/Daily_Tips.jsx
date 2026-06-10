import React from "react";
import useStore from "../../store/useStore";
import styles from "./Daily_Tips.module.css";
import { AiOutlineCalendar, AiOutlineSmile, AiOutlineStar, AiFillHeart } from "react-icons/ai";

// 31 Distinct Ayurvedic Tips for each day of the month (Bilingual format)
const MONTHLY_TIPS = [
  {
    titleHindi: "सुबह का जल अनुष्ठान (उषापान)",
    titleEnglish: "Morning Water Ritual (Ushapan)",
    category: "Hydration",
    benefitsHindi: "गुर्दे के मार्ग को साफ करता है, आंतों की गतिशीलता को उत्तेजित करता है, और पाचक रसों को सक्रिय करता है।",
    benefitsEnglish: "Flushes kidney tract, stimulates peristalsis, wakes up digestive enzymes.",
    actionHindi: "सुबह सोकर उठते ही, बिना ब्रश किए तांबे के पात्र में रखा २ गिलास गुनगुना पानी पिएं।",
    actionEnglish: "Drink 2 glasses of lukewarm copper-charged water immediately upon waking, before brushing your teeth."
  },
  {
    titleHindi: "ऑयल पुलिंग (गंडूष)",
    titleEnglish: "Oil Pulling (Gandusha)",
    category: "Oral Health",
    benefitsHindi: "दांतों, मसूड़ों और जबड़े को मजबूत करता है; लार से वसा-घुलनशील विषाक्त पदार्थों को बाहर निकालता है।",
    benefitsEnglish: "Strengthens teeth, gums, and jaw; extracts fat-soluble toxins from saliva.",
    actionHindi: "१ बड़ा चम्मच जैविक तिल या नारियल का तेल मुंह में लेकर १०-१५ मिनट तक घुमाएं, फिर इसे थूक दें।",
    actionEnglish: "Swish 1 tablespoon of organic sesame or coconut oil in your mouth for 10-15 minutes, then spit it out."
  },
  {
    titleHindi: "सूखी त्वचा की मालिश (घर्षण)",
    titleEnglish: "Dry Brush Exfoliation (Garshana)",
    category: "Circulation",
    benefitsHindi: "लसीका जल निकासी (lymphatic drainage) को उत्तेजित करता है, वसा जमाव को कम करता है और मृत त्वचा कोशिकाओं को हटाता है।",
    benefitsEnglish: "Stimulates lymphatic drainage, breaks down fat deposits, removes dead skin cells.",
    actionHindi: "स्नान करने से पहले सूखे शरीर पर रेशम या प्राकृतिक ब्रिसल वाले ब्रश से हृदय की दिशा में हल्के हाथों से रगड़ें।",
    actionEnglish: "Use a raw silk or natural bristle brush to scrub your dry skin using long strokes towards the heart before bathing."
  },
  {
    titleHindi: "भोजन का सही समय (सूर्य के अनुसार)",
    titleEnglish: "Solarized Diet Timing",
    category: "Diet",
    benefitsHindi: "पोषक तत्वों के अवशोषण को बढ़ाता है और पाचन को जठराग्नि (सूर्य की अग्नि) के साथ जोड़ता है।",
    benefitsEnglish: "Enhances nutrient absorption and aligns digestion with Agni (solar digestive fire).",
    actionHindi: "दोपहर के भोजन (12:00 PM से 1:30 PM के बीच) को दिन का सबसे भारी और मुख्य भोजन बनाएं जब सूर्य सबसे ऊपर हो।",
    actionEnglish: "Make lunch (between 12:00 PM and 1:30 PM) your largest meal of the day when the sun is highest."
  },
  {
    titleHindi: "शांत नींद का समय",
    titleEnglish: "Tranquil Sleep Schedule",
    category: "Sleep",
    benefitsHindi: "यकृत विषहरण और मानसिक शांति प्रदान करता है, प्राकृतिक जैविक घड़ियों के साथ तालमेल बनाता है।",
    benefitsEnglish: "Allows hepatic detox and mental processing matching natural biological clocks.",
    actionHindi: "रात ९:०० बजे तक डिजिटल स्क्रीन बंद कर दें और कफ चक्र के अनुसार रात १०:०० बजे तक सो जाएं।",
    actionEnglish: "Switch off digital screens by 9:00 PM and aim to sleep by 10:00 PM to align with Kapha cycles."
  },
  {
    titleHindi: "प्राणायाम श्वास क्रिया",
    titleEnglish: "Pranayama Breathing",
    category: "Mind",
    benefitsHindi: "मस्तिष्क के बाएं और दाएं गोलार्ध को संतुलित करता है; स्वायत्त तंत्रिका तंत्र को नियंत्रित करता है।",
    benefitsEnglish: "Balances left and right hemispheres of the brain; regulates autonomic nervous flows.",
    actionHindi: "सुबह ध्यान से पहले ५-१० मिनट के लिए अनुलोम-विलोम प्राणायाम (नाड़ी शोधन) का अभ्यास करें।",
    actionEnglish: "Practice Alternate Nostril Breathing (Nadi Shodhana) for 5-10 minutes before your morning meditation."
  }
];

// Hour-by-Hour Dinacharya Guidelines
const DINACHARYA_STEPS = [
  {
    time: "5:00 AM - 6:00 AM",
    titleHindi: "ब्राह्ममुहूर्त जागरण व उषापान",
    descHindi: "सूर्योदय से पूर्व जागें। बिना कुल्ला किए तांबे के पात्र का गुनगुना पानी पिएं। यह जठराग्नि को जाग्रत करता है और आंतों की सफाई करता है।",
    titleEnglish: "Brahma Muhurta waking & Hydration",
    descEnglish: "Wake up before sunrise during the ambient, pure hours. Drink copper-charged lukewarm water to stimulate digestion and cleanse intestines."
  },
  {
    time: "6:00 AM - 7:00 AM",
    titleHindi: "दंतधावन, जिह्वा शोधन व गंडूष",
    descHindi: "जीभ साफ करें ताकि विषैला लेप (आम) हट सके। तिल या नारियल तेल से १० मिनट कुल्ला (ऑयल पुलिंग) करें, जिससे मसूड़े स्वस्थ और दांत मजबूत होते हैं।",
    titleEnglish: "Oral Care & Oil Pulling (Gandusha)",
    descEnglish: "Scrape your tongue to remove toxicity (Ama). Swish warm sesame/coconut oil to draw out lipophilic impurities and strengthen oral walls."
  },
  {
    time: "7:00 AM - 8:00 AM",
    titleHindi: "योगाभ्यास, व्यायाम व मालिश",
    descHindi: "सूर्य नमस्कार, प्राणायाम व ध्यान करें। शरीर पर गुनगुने तिल के तेल से हल्की मालिश (अभ्यंग) करें, जो वात दोष को शांत करती है।",
    titleEnglish: "Yoga, Exercise & Self-Massage",
    descEnglish: "Perform Sun Salutations, pranayama, and grounding meditation. Apply warm oil (Abhyanga) to nourish nervous pathways and balance Vata."
  },
  {
    time: "8:00 AM - 9:00 AM",
    titleHindi: "हल्का नाश्ता (सुपाच्य आहार)",
    descHindi: "गुनगुने जल से स्नान के बाद ताज़ा और हल्का नाश्ता करें। दलिया, पके हुए फल या भीगे हुए बादाम-मुनक्का का सेवन सर्वोत्तम है।",
    titleEnglish: "Nourishing Light Breakfast",
    descEnglish: "Bathe in warm water, then enjoy fresh digestible breakfast like warm porridge, stewed apples, or soaked almonds and raisins."
  },
  {
    time: "12:00 PM - 1:30 PM",
    titleHindi: "मुख्य भोजन (मध्याह्न भोजन)",
    descHindi: "इस समय पित्त व सूर्य की अग्नि चरम पर होती है। दाल, चावल, ताज़ी सब्ज़ियाँ और छाछ से युक्त पौष्टिक भोजन करें। भोजन के बाद वज्रासन में बैठें।",
    titleEnglish: "Midday Power Lunch (Largest Meal)",
    descEnglish: "Your digestive fire (Agni) peaks with the sun. Consume a complete wholesome meal of grains, lentils, fresh vegetables, and buttermilk."
  },
  {
    time: "6:00 PM - 7:30 PM",
    titleHindi: "संध्याकाल व हल्का रात्रिभोज",
    descHindi: "सूर्यास्त के आसपास हल्का भोजन करें (सूप, उबली सब्ज़ियाँ या खिचड़ी)। भारी भोजन, गरिष्ठ पनीर या मैदा से बनी चीज़ों से दूर रहें।",
    titleEnglish: "Sunset Wind-down & Light Dinner",
    descEnglish: "Eat a light, easily digestible dinner near sunset (vegetable soups, khichdi). Avoid processed flours, cold leftovers, or heavy dairy items."
  },
  {
    time: "9:00 PM - 10:00 PM",
    titleHindi: "रात्रि विश्राम व निद्रा",
    descHindi: "त्रिफला चूर्ण गुनगुने पानी के साथ लें। तलवों में तेल लगाएं। शांत वातावरण में १० बजे तक सो जाएं ताकि शरीर खुद को डिटॉक्स कर सके।",
    titleEnglish: "Night Detoxification & Sleep",
    descEnglish: "Take Triphala with warm water. Massage feet soles with oil, disconnect from screens, and sleep by 10 PM to allow liver regeneration."
  }
];

// Three Pillars of Ayurveda
const THREE_PILLARS = [
  {
    nameHindi: "१. आहार (संतुलित भोजन)",
    descHindi: "भोजन ही सबसे बड़ी औषधि है। ताज़ा, ऋतु अनुकूल, और जठराग्नि को प्रदीप्त करने वाला सात्विक भोजन शरीर के तीनों दोषों को साम्यावस्था में रखता है। गलत खाद्य संयोजन (विरुद्ध आहार) से बचें।",
    nameEnglish: "1. Ahar (Dietary Discipline)",
    descEnglish: "Food is the ultimate medicine. Eating fresh, seasonal, and organic Sattvic meals keeps your metabolic fire (Agni) bright. Avoid incompatible food combinations (Viruddha Ahar)."
  },
  {
    nameHindi: "२. विहार (सकारात्मक जीवनशैली)",
    descHindi: "दैनिक दिनचर्या और ऋतुचर्या का पालन करना। व्यायाम, योग, तेल मालिश, और प्रकृति के साथ समय बिताना हमारे शारीरिक एवं मानसिक संतुलन को बनाए रखता है।",
    nameEnglish: "2. Vihar (Healthy Lifestyle)",
    descEnglish: "Aligning daily behavior and physical tasks with natural cycles. Daily exercise, yoga, self-massage, and outdoor breathing preserve hormonal and nervous equilibrium."
  },
  {
    nameHindi: "३. निद्रा (पुनर्जीवन एवं विश्राम)",
    descHindi: "पर्याप्त और गहरी नींद शरीर के ऊतकों की मरम्मत और मस्तिष्क के शोधन के लिए आवश्यक है। रात्रि १० बजे से पहले सोने से यकृत और पित्त वाहिकाओं की प्राकृतिक सफाई होती है।",
    nameEnglish: "3. Nidra (Restorative Sleep)",
    descEnglish: "Deep, uninterrupted sleep acts as a biological purifier. Waking up fresh by sleeping before 10 PM enables cellular repair, memory consolidation, and lymphatic detox."
  }
];

// Seasonal Guidelines (Ritucharya)
const SEASONAL_RULES = [
  {
    seasonHindi: "ग्रीष्म ऋतु (गर्मी का मौसम)",
    tipsHindi: "शीतल, मीठे, और तरल पदार्थों का सेवन बढ़ाएं। नारियल पानी, पुदीना, तरबूज और सत्तू लें। तीखे, नमकीन, और ज्यादा गर्म भोजन से बचें। दोपहर में अधिक धूप में न निकलें।",
    seasonEnglish: "Grishma (Summer Care)",
    tipsEnglish: "Prioritize sweet, cooling, and liquid items. Drink coconut water, mint teas, and barley water. Avoid heavily spicy, salty, or hot foods. Rest during peak heat hours."
  },
  {
    seasonHindi: "वर्षा ऋतु (मानसून का मौसम)",
    tipsHindi: "इस मौसम में जठराग्नि कमजोर होती है। सूप, दाल का पानी, और सोंठ/अदरक युक्त सुपाच्य भोजन लें। कच्चे सलाद और बासी भोजन से बचें। पानी को उबालकर गुनगुना पिएं।",
    seasonEnglish: "Varsha (Monsoon Care)",
    tipsEnglish: "Metabolic fire (Agni) is naturally weak. Consume light, hot soups and spiced lentils. Avoid raw salads, frozen items, or overnight leftovers. Drink boiled water."
  },
  {
    seasonHindi: "शीत ऋतु (सर्दी का मौसम)",
    tipsHindi: "शरीर की ताकत सबसे अधिक होती है। गर्म, स्निग्ध (घी, तेल) और भारी पोषक तत्व लें। बाजरा, तिल, गुड़ और अदरक की चाय लें। सरसों या तिल के तेल से मालिश अवश्य करें।",
    seasonEnglish: "Shishir/Hemant (Winter Care)",
    tipsEnglish: "Digestive capability is strongest. Eat warm, unctuous (ghee, oil), and calorie-rich nourishing meals. Enjoy sesame seeds, ginger, and root veggies. Apply daily warm oil."
  }
];

function DailyTips() {
  const { user, doshaProfile } = useStore();
  
  // Select tip of the day dynamically using the date
  const today = new Date();
  const dayOfMonth = today.getDate(); // 1 to 31
  const tipIndex = (dayOfMonth - 1) % MONTHLY_TIPS.length;
  const todaysTip = MONTHLY_TIPS[tipIndex];

  return (
    <div className={styles.container}>
      {/* Calendar Header */}
      <header className={styles.header}>
        <div className={styles.calendarBadge}>
          <AiOutlineCalendar className={styles.calendarIcon} />
          <span>{today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className={styles.mainTitle}>Ayurvedic Dinacharya & Daily Wisdom</h1>
        <p className={styles.subTitle}>
          Bilingual Daily Guides to Align Your Body, Mind, and Soul with Nature’s Sacred Rhythms.
        </p>
      </header>

      {/* Main Bilingual Split Column Section: Left Hindi, Right English */}
      <div className={styles.bilingualMainLayout}>
        
        {/* ================= LEFT SIDE: HINDI (हिन्दी) ================= */}
        <div className={styles.columnHindi}>
          <div className={styles.languageIndicator}>हिन्दी संस्करण</div>

          {/* Active Daily Tip Card - Hindi */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>आज का मुख्य सुझाव ({todaysTip.category})</h2>
          </div>
          <div className={styles.cardContainer}>
            <h3 className={styles.cardMainTitle}>{todaysTip.titleHindi}</h3>
            <div className={styles.tipDetailBlock}>
              <h4>स्वास्थ्य लाभ:</h4>
              <p>{todaysTip.benefitsHindi}</p>
            </div>
            <div className={styles.tipDetailBlock}>
              <h4>दैनिक कार्य योजना:</h4>
              <p className={styles.highlightText}>{todaysTip.actionHindi}</p>
            </div>
          </div>

          {/* Dinacharya Hour-by-Hour - Hindi */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>संपूर्ण दैनिक दिनचर्या (दिन-भर के नियम)</h2>
          </div>
          <div className={styles.timelineContainer}>
            {DINACHARYA_STEPS.map((step, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timeBadge}>{step.time}</div>
                <div className={styles.timelineContent}>
                  <h3>{step.titleHindi}</h3>
                  <p>{step.descHindi}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Three Pillars - Hindi */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>आरोग्य के तीन मुख्य स्तंभ</h2>
          </div>
          <div className={styles.pillarsVertical}>
            {THREE_PILLARS.map((pillar, idx) => (
              <div key={idx} className={styles.pillarItemCard}>
                <h3>{pillar.nameHindi}</h3>
                <p>{pillar.descHindi}</p>
              </div>
            ))}
          </div>

          {/* Seasonal - Hindi */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>ऋतुचर्या (मौसम के अनुसार आहार-विहार)</h2>
          </div>
          <div className={styles.seasonsVertical}>
            {SEASONAL_RULES.map((rule, idx) => (
              <div key={idx} className={styles.seasonItemCard}>
                <h3>{rule.seasonHindi}</h3>
                <p>{rule.tipsHindi}</p>
              </div>
            ))}
          </div>

        </div>

        {/* ================= RIGHT SIDE: ENGLISH ================= */}
        <div className={styles.columnEnglish}>
          <div className={styles.languageIndicator}>English Version</div>

          {/* Active Daily Tip Card - English */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>Active Daily Tip ({todaysTip.category})</h2>
          </div>
          <div className={styles.cardContainer}>
            <h3 className={styles.cardMainTitle}>{todaysTip.titleEnglish}</h3>
            <div className={styles.tipDetailBlock}>
              <h4>Key Benefits:</h4>
              <p>{todaysTip.benefitsEnglish}</p>
            </div>
            <div className={styles.tipDetailBlock}>
              <h4>Daily Action Plan:</h4>
              <p className={styles.highlightText}>{todaysTip.actionEnglish}</p>
            </div>
          </div>

          {/* Dinacharya Hour-by-Hour - English */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>Complete Dinacharya (Daily Routine)</h2>
          </div>
          <div className={styles.timelineContainer}>
            {DINACHARYA_STEPS.map((step, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timeBadge}>{step.time}</div>
                <div className={styles.timelineContent}>
                  <h3>{step.titleEnglish}</h3>
                  <p>{step.descEnglish}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Three Pillars - English */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>Three Pillars of Health (Tripod)</h2>
          </div>
          <div className={styles.pillarsVertical}>
            {THREE_PILLARS.map((pillar, idx) => (
              <div key={idx} className={styles.pillarItemCard}>
                <h3>{pillar.nameEnglish}</h3>
                <p>{pillar.descEnglish}</p>
              </div>
            ))}
          </div>

          {/* Seasonal - English */}
          <div className={styles.sectionHeader}>
            <AiOutlineStar className={styles.sectionIcon} />
            <h2>Ritucharya (Seasonal Self-Care Guide)</h2>
          </div>
          <div className={styles.seasonsVertical}>
            {SEASONAL_RULES.map((rule, idx) => (
              <div key={idx} className={styles.seasonItemCard}>
                <h3>{rule.seasonEnglish}</h3>
                <p>{rule.tipsEnglish}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* User Context Personalization Banner */}
      {user && (
        <section className={styles.personalBanner}>
          <AiOutlineSmile className={styles.smileIcon} />
          <div>
            <h3>Personalized Wellness Feed for {user.username}</h3>
            <p>
              Your active Dosha profile is <strong>{doshaProfile}</strong>. 
              {doshaProfile !== "Unknown" ? ` Adjust today's tip for ${doshaProfile} by prioritizing warm, moist foods and calming activities.` : " Take the Dosha quiz on the homepage to unlock fully personalized wellness recommendations."}
            </p>
          </div>
        </section>
      )}

      {/* Trust Quote Footer section */}
      <footer className={styles.tipsFooter}>
        <AiFillHeart className={styles.heartIcon} />
        <p>स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च ॥</p>
        <span>"To protect the health of the healthy and cure the disease of the sick." — Charaka Samhita</span>
      </footer>

    </div>
  );
}

export default DailyTips;

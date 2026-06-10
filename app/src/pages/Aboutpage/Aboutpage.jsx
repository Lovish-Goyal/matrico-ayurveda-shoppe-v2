import React from "react";
import styles from "./Aboutpage.module.css";
import { 
  AiOutlineSafetyCertificate, 
  AiOutlineExperiment, 
  AiOutlineTeam, 
  AiOutlineHeart,
  AiOutlineBulb,
  AiOutlineBook,
  AiOutlineQuestionCircle
} from "react-icons/ai";

function Aboutpage() {
  return (
    <section className={styles.aboutPage}>
      {/* Ambient backgrounds */}
      <div className={styles.ambientGlow1}></div>
      <div className={styles.ambientGlow2}></div>

      <div className={styles.container}>
        {/* Intro Hero Header */}
        <header className={styles.aboutHero}>
          <span className={styles.aboutBadge}>Our Sacred Journey</span>
          <h1 className={styles.aboutHeroTitle}>About Metrico Ayurveda Shoppe</h1>
          <p className={styles.aboutHeroSub}>
            Bridging 5,000 years of Vedic wisdom with cutting-edge computational diagnostics to deliver authentic, standardized, and personalized natural remedies.
          </p>
        </header>

        {/* Section 1: Our Roots & Identity */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>हमारी विरासत और पहचान | Our Sacred Roots & Identity</h2>
            <p>
              Welcome to <strong>Metrico Ayurveda Shoppe</strong>, your premier destination for clinical-grade, authentic Ayurvedic formulations. Rooted in the ancient teachings of Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya, our dispensary was established to restore biological balance (Samya) in a fast-paced modern world. We operate on the belief that perfect health is the birthright of every human being, and nature holds the key to achieving it.
            </p>
            <p>
              Ayurveda is not merely a collection of herbal remedies; it is a holistic philosophy of life (Veda of Ayus) that views wellness as the seamless integration of body, mind, senses, and consciousness. We are committed to translating this profound knowledge into safe, standardized, and accessible health protocols. By harvesting botanicals from their native habitats and utilizing modern scientific standardization techniques, we ensure that every bottle preserves the active prana (life force) of nature.
            </p>
            <p>
              In our pursuit of absolute authenticity, we reject the industrial shortcuts common in modern herbal manufacturing. Instead, we return to the classical text methods—such as slow-decoction boiling, solar infusion, and manual purification of herbs. This rigorous dedication ensures that the healing principles of the plants remain structurally undamaged and highly bioavailable for cellular absorption.
            </p>
          </div>
        </div>

        {/* Section 1.3: Panchamahabhuta & The Five Elements (New Section) */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>पंचमहाभूत और पाँच तत्व | Panchamahabhuta & The Five Elements</h2>
            <p>
              Ayurveda posits that everything in the cosmos—including our physical body—is composed of five fundamental elements: <strong>Akasha</strong> (Space), <strong>Vayu</strong> (Air), <strong>Tejas</strong> (Fire), <strong>Ap</strong> (Water), and <strong>Prithvi</strong> (Earth). These elements combine in unique proportions to create the three biological energies or Doshas: Vata, Pitta, and Kapha.
            </p>
            <p>
              Our diagnostic systems and customized formulations are designed to balance these elemental forces. For instance, dry and cold Vata (Space + Air) is counteracted with warm, heavy, and grounding Earth-Water herbs like Ashwagandha. Sharp and inflammatory Pitta (Fire + Water) is pacified with cooling and soothing herbs like Shatavari and Brahmi. Congested Kapha (Water + Earth) is stimulated and cleared using warming, spicy elements like Trikatu (Ginger, Black Pepper, and Long Pepper). By understanding the cosmic elements, we treat the source, not just the symptom.
            </p>
          </div>
        </div>

        {/* Section 1.5: Founders' Vision & Legacy */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>संस्थापक की दृष्टि और विरासत | Founders' Vision & Legacy</h2>
            <p>
              Matrico was co-founded by a collective of traditional third-generation Ayurvedic Vaidyas, modern pharmacologists, and systems engineers who shared a single, non-negotiable vision: to free Ayurveda from the clutches of cheap commercialization and unverified claims. We witnessed how mass production often degraded the medicinal value of sacred herbs by using artificial fillers, low-potency extracts, and heavy chemical preservatives.
            </p>
            <p>
              Our founding Vaidyas brought centuries of inherited family manuscripts detailing specific herbal combinations, while our modern science team integrated HPLC analysis, atomic spectroscopy, and cleanroom technologies to guarantee safety. Lovish Goyal, our lead systems architect, designed the smart clinical AI search engine to make this elite traditional medicine accessible to anyone, anywhere, without barriers. We stand for an Ayurveda that is honest, sustainable, scientifically verifiable, and highly effective.
            </p>
          </div>
        </div>

        {/* Section 2: The Three Core Pillars (Grid) */}
        <div className={styles.pillarsSection}>
          <div className={styles.sectionHeader}>
            <AiOutlineBulb className={styles.sectionIcon} />
            <h2>मैट्रिको के तीन मुख्य सिद्धांत | Three Core Pillars of Matrico</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {/* Pillar 1 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <AiOutlineSafetyCertificate />
              </div>
              <h3>1. Absolute Purity (शुद्धता)</h3>
              <p>
                Our herbs are ethically harvested from their natural geographical habitats, primarily in the high-altitude valleys of the Himalayas and organic fertile plains of India. We enforce zero-chemical, zero-pesticide, and heavy-metal-free cultivation.
              </p>
              <p style={{ marginTop: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
                We verify soil chemistry and water quality at each growing location before harvesting to prevent any environmental contamination.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <AiOutlineExperiment />
              </div>
              <h3>2. Scientific Standardization (मानकीकरण)</h3>
              <p>
                We bridge the gap between faith and evidence. Every batch of tablets (Vati), decoctions (Kwath), and powders (Churna) undergoes strict Chromatography and Lab verification to guarantee high bioavailable concentrations of active herbal molecules.
              </p>
              <p style={{ marginTop: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
                We test every batch to certify exact concentrations of key actives such as Withanolides, Curcuminoids, and Bacosides.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <AiOutlineTeam />
              </div>
              <h3>3. AI-Driven Personalization (एआई-आधारित अनुकूलन)</h3>
              <p>
                Because no two bodies are alike, we deploy smart clinical models to determine your active Prakriti (Dosha constitution) and match you with remedies that align with your unique biological rhythm, promoting genuine self-healing.
              </p>
              <p style={{ marginTop: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
                Our algorithms cross-reference ancient texts with modern clinical contraindications to ensure a perfectly tailored regimen.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2.2: The Seven Dhatus & Physical Tissues (New Section) */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>सप्त धातु और शारीरिक ऊतक | The Seven Dhatus & Biological Tissues</h2>
            <p>
              According to Ayurvedic physiology, the body is supported by seven key tissue layers called <strong>Dhatus</strong>. These are nourished sequentially: <strong>Rasa</strong> (Plasma/lymph), <strong>Rakta</strong> (Blood/circulation), <strong>Mamsa</strong> (Muscle), <strong>Meda</strong> (Fat/adipose), <strong>Asthi</strong> (Bone), <strong>Majja</strong> (Nerve/bone marrow), and <strong>Shukra</strong> (Reproductive tissue).
            </p>
            <p>
              Our premium formulas do not just target superficial symptoms; they nourish these deep tissues in a cascading sequence. For instance, our joint formulas (like Peedantak) focus on lubricating the Asthi (Bone) and Sandhi (Joint) interfaces while calming the Majja (Nerves) to reduce pain signals. Our rejuvenative tonics (Rasayanas) nourish the final tissue layer, Shukra, which leads to the formation of <strong>Ojas</strong>—the ultimate refined energy responsible for immunity, radiant skin, and vibrant mental health.
            </p>
          </div>
        </div>

        {/* Section 2.5: The Three Gunas & Mental Harmony */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>त्रिगुण और मानसिक संतुलन | The Three Gunas & Mind Balance</h2>
            <p>
              Ayurveda teaches that the mind consists of three primary attributes or forces: <strong>Sattva</strong> (purity, clarity, light, and harmony), <strong>Rajas</strong> (passion, action, movement, and agitation), and <strong>Tamas</strong> (inertia, darkness, sleep, and stability). Our formulations are balanced not just to calm physical symptoms, but to elevate Sattvic energy in the mind.
            </p>
            <p>
              By combining herbs like Ashwagandha (to calm active Vata anxiety/Rajas), Brahmi (to clarify the intellect and enhance Sattva), and Shankhpushpi (to nourish deep sleep pathways and ease Tamas), we target the psychosomatic root of wellness, ensuring your body and mind recover in unison.
            </p>
            <p>
              Modern stress often locks the nervous system into a state of high Rajas (fight or flight). Through carefully balanced adaptogenic blends, we help downregulate the nervous system, guiding you back to a clear, calm, and productive Sattvic state of living.
            </p>
          </div>
        </div>

        {/* Section 3: Timeline Process - Soil to Bottle */}
        <div className={styles.processSection}>
          <div className={styles.sectionHeader}>
            <AiOutlineExperiment className={styles.sectionIcon} />
            <h2>खेत से बोतल तक - हमारी प्रक्रिया | Soil to Bottle - Our Pure Process</h2>
          </div>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>01</div>
              <h4>Ethical Sourcing & Wildcrafting</h4>
              <p>Herbs are handpicked at custom times of day when active phyto-nutrients are at their peak, preserving natural biochemical structures.</p>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>02</div>
              <h4>Sodhana (Purification)</h4>
              <p>Ingredients are cleaned using traditional sodhana techniques to purge physical impurities and amplify therapeutic potency.</p>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>03</div>
              <h4>Phyto-Chemical Extraction</h4>
              <p>Scientific low-temperature concentrations draw out raw biological compounds without degrading active organic cells.</p>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>04</div>
              <h4>AI Dosha Recommendations</h4>
              <p>Remedies are mapped to symptoms using Dosha profile rules, bringing custom Ayurveda directly to your dashboard.</p>
            </div>
          </div>
        </div>

        {/* Section 3.2: Manufacturing Standards & WHO-GMP (New Section) */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>विश्व स्तरीय विनिर्माण मानक | Manufacturing Excellence & WHO-GMP Guidelines</h2>
            <p>
              We manufacture our formulations in a world-class, state-of-the-art facility certified by the World Health Organization's Good Manufacturing Practices (WHO-GMP) and the Ministry of AYUSH. The entire facility operates under ISO 9001:2015 quality protocols to ensure a sterile, humidity-controlled, and dust-free environment.
            </p>
            <p>
              Our processing utilizes non-reactive food-grade SS-316 stainless steel equipment to prevent any metallic cross-contamination. We implement modern cold-processing extraction to yield standard concentrations of medicinal herbs without using excessive heat, which destroys volatile oils and sensitive plant proteins. This meticulous synthesis guarantees clean, raw, and high-potency medicinal output.
            </p>
          </div>
        </div>

        {/* Section 3.5: Phyto-Chemical Validation & Lab Testing */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>मानकीकरण और लैब परीक्षण | Phyto-Chemical Validation & Rigorous Testing</h2>
            <p>
              In our research facility, every batch of botanicals is subjected to rigorous testing procedures to ensure that what goes inside your body is safe, standard, and highly potent. Our quality verification protocol includes:
            </p>
            <div className={styles.testingList}>
              <div className={styles.testItem}>
                <strong>• HPLC Chromatography (उच्च प्रदर्शन तरल वर्णलेखन):</strong> Verifies the precise percentage of active phyto-constituents (such as Withanolides in Ashwagandha or Curcumin in Turmeric) to guarantee standardized efficacy.
              </div>
              <div className={styles.testItem}>
                <strong>• Heavy Metal Analysis via AAS (भारी धातु विश्लेषण):</strong> Employs Atomic Absorption Spectroscopy to ensure that toxic trace elements like Lead, Arsenic, Mercury, and Cadmium are completely absent or below safety limits.
              </div>
              <div className={styles.testItem}>
                <strong>• Microbial & Pathogen Assays (रोगाणु परीक्षण):</strong> Verifies that all powders, tablets, and decoctions are free from harmful bacteria, E. coli, Salmonella, mold, or fungal spores.
              </div>
              <div className={styles.testItem}>
                <strong>• Pesticide Residue Profiling (कीटनाशक अवशेष परीक्षण):</strong> Gas Chromatography checks confirm that no artificial chemical fertilizers or agricultural pesticides are present in the herbs.
              </div>
              <div className={styles.testItem}>
                <strong>• Moisture & Ash Values (नमी मूल्य परीक्षण):</strong> Monitors water content to prevent storage degradation and ensure long-term stability without mold risks.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.8: Clinical Evidence & Studies (New Section) */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>नैदानिक अनुसंधान और साक्ष्य | Modern Clinical Evidence & Research</h2>
            <p>
              Ayurveda is a science of observation validated by millennia. At Matrico, we bring this validation to the laboratory by reviewing peer-reviewed clinical research trials. For example:
            </p>
            <div className={styles.testingList}>
              <div className={styles.testItem}>
                <strong>• Ashwagandha (Withania somnifera):</strong> Clinical trials confirm a significant reduction in serum cortisol levels, supporting its role as a premium adaptogen that calms anxiety and enhances focus.
              </div>
              <div className={styles.testItem}>
                <strong>• Brahmi (Bacopa monnieri):</strong> Double-blind placebo-controlled studies show enhanced cognitive processing speed, synapse connectivity, and memory retention through upregulation of brain-derived neurotrophic factor (BDNF).
              </div>
              <div className={styles.testItem}>
                <strong>• Giloy (Tinospora cordifolia):</strong> Research demonstrates immunostimulatory properties by increasing macrophage activity and boosting white blood cell response, protecting the body naturally.
              </div>
              <div className={styles.testItem}>
                <strong>• Amalaki (Emblica officinalis):</strong> Scientific evaluations highlight its dense concentrations of natural Vitamin C and polyphenols, serving as a powerful scavenger of biological free radicals.
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Vaidya Panel & Leadership */}
        <div className={styles.vaidyaSection}>
          <div className={styles.sectionHeader}>
            <AiOutlineTeam className={styles.sectionIcon} />
            <h2>विशेषज्ञ वैद्य मंडल | Expert Vaidya Panel</h2>
          </div>

          <div className={styles.vaidyaContentSplit}>
            <div className={styles.vaidyaText}>
              <p>
                Our formulary is supervised by a senior panel of B.A.M.S. (Bachelor of Ayurvedic Medicine and Surgery) Vaidyas, clinical researchers, and pharmacologists. Together, they review traditional recipes, align them with modern clinical dosage guides, and certify their bio-safety.
              </p>
              <p>
                Whether you consult our digital chatbot assistant or choose a pre-formulated bundle, you can rest assured that every remedy has been rigorously validated, checked against cross-interactions, and approved by qualified Ayurvedic doctors. Our council meets weekly to audit product quality, customer health tracking logs, and new scientific papers in botany.
              </p>
            </div>
            <div className={styles.quoteCard}>
              <AiOutlineHeart className={styles.quoteIcon} />
              <p className={styles.sanskritQuote}>
                "स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च ॥"
              </p>
              <span className={styles.quoteAuthor}>— Acharya Charaka, Charaka Samhita (Sutrasthana 30.26)</span>
              <p style={{ fontSize: "11.5px", color: "#8c6a3b", marginTop: "10px", lineHeight: "1.4" }}>
                Translation: "To protect the health of the healthy, and to alleviate the disorders of the diseased."
              </p>
            </div>
          </div>
        </div>

        {/* Section 4.2: Ayurvedic Daily Lifestyle Guidelines - Ahar, Vihar, Vichar (New Section) */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>आयुर्वेदिक दिनचर्या और जीवन शैली | Daily Ayurvedic Guidelines (Ahar, Vihar, Vichar)</h2>
            <p>
              True healing requires lifestyle alignment alongside herbal remedies. We encourage all Matrico customers to incorporate the three pillars of daily health (Upastambhas):
            </p>
            <div className={styles.testingList}>
              <div className={styles.testItem}>
                <strong>1. Ahar (Diet/Nutrition):</strong> Eat freshly cooked, warm, organic meals aligned with your Dosha constitution. Avoid incompatible food combinations (Viruddha Ahar)—such as mixing milk with sour fruits or fish. Eat when your digestive fire (Agni) is genuinely active.
              </div>
              <div className={styles.testItem}>
                <strong>2. Vihar (Lifestyle/Movement):</strong> Wake up close to sunrise (Brahma Muhurta) to absorb positive morning energy. Engage in daily physical exercise (Vyayama) to half of your lung capacity. Maintain a regular sleep schedule, aiming for 7-8 hours of sound sleep starting before 10:00 PM.
              </div>
              <div className={styles.testItem}>
                <strong>3. Vichar (Mindful Thought/Awareness):</strong> Cultivate mental clarity and peace through daily pranayama (breath control) and meditation. Practice self-reflection and kindness to reduce emotional toxins (Ama) in the mind, promoting clear communication and sound sleep.
              </div>
            </div>
          </div>
        </div>

        {/* Section 4.5: Fair-Trade Sourcing Cooperatives */}
        <div className={styles.aboutSection}>
          <div className={styles.textBlock}>
            <h2>सहकारी जैविक कृषि | Fair-Trade Sourcing & Local Cooperatives</h2>
            <p>
              We believe that healing begins with the earth. Matrico partners directly with over 2,500 small-scale farmers and forest-dwelling tribal cooperatives across the Himalayan foothills, the Western Ghats, and the central plains of Madhya Pradesh. 
            </p>
            <p>
              By paying fair-trade premium wages and providing training in sustainable harvesting practices, we protect endangered forest reserves from over-exploitation while securing a high-quality, continuous supply of rare botanicals. This ethical circle supports rural livelihoods and ensures that the herbs you consume are grown with love, respect, and gratitude.
            </p>
            <p>
              We also support local educational and wellness programs in our farming villages, building drinking water infrastructure and providing medical checks to protect the health of the communities that nurture our sacred botanicals.
            </p>
          </div>
        </div>

        {/* Section 4.8: FAQs Section (Expanded/Doubled) */}
        <div className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <AiOutlineQuestionCircle className={styles.sectionIcon} />
            <h2>अक्सर पूछे जाने वाले प्रश्न | Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h4>How is Matrico different from mass-market brands?</h4>
              <p>Mass-market brands often grind dried plants without separating active elements. Matrico utilizes standardized extracts, meaning we extract the active chemical compounds (like Withanolides) and concentrate them for consistent clinical strength and predictable results.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>Are Matrico remedies safe for long-term usage?</h4>
              <p>Yes. All our products are 100% natural, vegetarian, gluten-free, and formulated without chemical preservatives. Since they undergo strict validation checks for heavy metals, they can be consumed safely under the guidance of our Vaidyas.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>How does the AI Dosha check work?</h4>
              <p>Our AI model takes inputs based on traditional Ayurvedic Prakriti diagnosis parameters (physical build, digestion habits, sleep patterns, thermal reactions) and calculates the dominant Dosha (Vata, Pitta, Kapha) to recommend matching remedies.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>Do your products contain heavy metals?</h4>
              <p>Absolutely not. While traditional metals (Bhasmas) are used in some branches of classical Ayurveda, Matrico specializes in 100% pure herbal extracts, which are systematically tested to ensure heavy metals are completely absent.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>What is the shelf life of your Ayurvedic formulations?</h4>
              <p>Because we use low-moisture vacuum packing and UV-protective glass containers, our powders (Churna) remain potent for 2 years, and our tablets (Vati) remain stable for 3 years without requiring any artificial chemical preservatives.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>Can I take Matrico products alongside allopathic medications?</h4>
              <p>Ayurvedic herbs generally act as dietary supplements and work safely with other systems of medicine. However, we advise taking them with a gap of 60 to 90 minutes. Always consult our Vaidyas or your physician for personalized guidance.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>Where are your herbs grown and harvested?</h4>
              <p>Our herbs are grown in certified organic soil. We procure Ashwagandha from Madhya Pradesh, Brahmi from wet organic plains, Swasari herbs from the lower Himalayan valleys, and Giloy from trees in Central India to ensure supreme natural quality.</p>
            </div>
            <div className={styles.faqCard}>
              <h4>How long does it take to see results with Ayurveda?</h4>
              <p>Ayurveda works by balancing the root cause rather than suppressing symptoms. While acute relief (like digestion or respiratory clarity) can occur within a few days, chronic adjustments typically take 4 to 6 weeks of regular usage.</p>
            </div>
          </div>
        </div>

        {/* Section 5: Eco-Pledge */}
        <footer className={styles.aboutFooter}>
          <h3>Our Ecological Pledge</h3>
          <p>
            Matrico Ayurveda Shoppe is committed to 100% biodegradable packaging, carbon-neutral wildcrafting, and supporting indigenous tribal farming communities who guard the forest reserves of our sacred herbs.
          </p>
        </footer>

      </div>
    </section>
  );
}

export default Aboutpage;


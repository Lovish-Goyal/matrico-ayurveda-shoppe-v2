import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api.js";
import styles from "./SymptomsPage.module.css";
import { AiOutlineSearch, AiOutlineRobot, AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";

const CATEGORIES = [
  { name: "Digestion", icon: "🌱", symptoms: ["Indigestion", "Constipation"] },
  { name: "Respiration", icon: "💨", symptoms: ["Cough & Cold", "Fever"] },
  { name: "Joint Care", icon: "🦴", symptoms: ["Joint Pain"] },
  { name: "Mind & Sleep", icon: "🧘", symptoms: ["Anxiety and Stress", "Insomnia"] },
  { name: "Skin & Eyes", icon: "👁️", symptoms: ["Skin Diseases (Eczema, Psoriasis)", "Eye Problems"] }
];

const SymptomPage = () => {
  const location = useLocation();
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const data = await api.getDiseases();
        setSymptoms(data);
      } catch (err) {
        console.error("Failed to fetch symptoms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, []);

  // Handle state passed from navigation (e.g. from Homepage search)
  useEffect(() => {
    if (!loading && symptoms.length > 0 && location.state) {
      const stateSearchQuery = location.state.searchQuery || "";
      const stateSymptomName = location.state.selectedSymptomName || "";

      if (stateSymptomName) {
        const matched = symptoms.find(s => s.name.toLowerCase() === stateSymptomName.toLowerCase());
        if (matched) {
          handleSymptomClick(matched);
        }
      } else if (stateSearchQuery) {
        setSearchQuery(stateSearchQuery);
        // Find match in database
        const matched = symptoms.filter((sym) =>
          sym.name.toLowerCase().includes(stateSearchQuery.toLowerCase()) ||
          sym.herbs?.some((h) => h.toLowerCase().includes(stateSearchQuery.toLowerCase())) ||
          sym.medicineName?.toLowerCase().includes(stateSearchQuery.toLowerCase())
        );
        if (matched.length > 0) {
          handleSymptomClick(matched[0]);
        } else {
          // If no local matches, automatically trigger AI consultation!
          handleAIConsult(stateSearchQuery);
        }
      }
    }
  }, [loading, symptoms, location.state]);

  const handleSymptomClick = (symptom) => {
    setAiResult(null);
    const formattedSymptom = {
      ...symptom,
      Herbs: symptom.herbs || [],
      medicine: symptom.medicineName,
      ayurvedic_medicine: symptom.ayurvedicMedicine ? {
        ...symptom.ayurvedicMedicine,
        net_weight: symptom.ayurvedicMedicine.netWeight,
        safety_information: {
          precautions: symptom.ayurvedicMedicine.safetyInformation?.precautions || [],
          side_effects: symptom.ayurvedicMedicine.safetyInformation?.sideEffects || ""
        }
      } : null,
      ayurvedic_upchar: symptom.ayurvedicUpchar || []
    };
    setSelectedSymptom(formattedSymptom);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory?.name === category.name ? null : category);
    setSelectedSymptom(null);
    setAiResult(null);
  };

  // Filter symptoms based on search query
  const filteredSymptoms = searchQuery.trim().length > 1
    ? symptoms.filter((sym) =>
        sym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sym.herbs?.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sym.medicineName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAIConsult = async (queryParam) => {
    const query = typeof queryParam === "string" ? queryParam : searchQuery;
    if (!query || !query.trim()) return;
    
    setAiLoading(true);
    setSelectedSymptom(null);
    setAiResult(null);

    try {
      const result = await api.consultAI(query);
      setAiResult(result);
      
      // Check if we have a recommended product
      const product = result.recommendedProducts?.[0];

      setSelectedSymptom({
        name: `AI Analysis: ${query}`,
        medicine: product ? product.name : "Custom Ayurvedic Recommendation",
        description: result.reply,
        Herbs: result.relatedHerbs || [],
        ayurvedic_medicine: product ? {
          name: product.name,
          price: product.price,
          brand: "Recommended Product",
          form: "Formulation",
          net_weight: "Standard Pack",
          benefits: [product.description],
          ingredients: product.ingredients ? [product.ingredients] : []
        } : null,
        link: product ? product.link : "https://www.amazon.in",
        image: product ? product.imageSrc : "default_medicine.png"
      });
    } catch (err) {
      console.error("AI Consult failed:", err);
      alert("AI Consultation failed. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <span className={styles.headerBadge}>CLINICAL AYURVEDA PORTAL</span>
        <h2 className={styles.heading}>
          SMART SYMPTOMS <span className={styles.headingAlt}>DIAGNOSTICS</span>
        </h2>
        <p className={styles.subHeadingText}>
          Search symptoms, browse verified Ayurvedic categories, or consult our AI Vaidya for natural remedies.
        </p>
      </div>

      {/* Centerpiece Smart Searchbar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBarWrapper}>
          <AiOutlineSearch 
            className={styles.searchIcon} 
            style={{ cursor: "pointer" }}
            onClick={() => handleAIConsult()}
          />
          <input
            type="text"
            placeholder="Search symptoms, herbs, or remedies (e.g., dry cough, constipation, knee pain)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedSymptom(null);
              setAiResult(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAIConsult()}
            className={styles.searchInput}
          />
          {searchQuery.trim().length > 1 && (
            <button className={styles.btnSearchAI} onClick={() => handleAIConsult()}>
              Ask AI Vaidya
            </button>
          )}
        </div>
        
        {/* Suggestion tags under search bar */}
        <div className={styles.searchSuggestions}>
          <span className={styles.suggestionLabel}>Popular:</span>
          {["Constipation", "Cough & Cold", "Joint Pain", "Fever", "Anxiety"].map((tag) => (
            <button 
              key={tag} 
              onClick={() => {
                setSearchQuery(tag);
                setSelectedSymptom(null);
                setAiResult(null);
              }} 
              className={styles.suggestionTag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-suggest results list / AI Prompt */}
      {searchQuery.trim().length > 1 && (
        <>
          {filteredSymptoms.length > 0 ? (
            <div className={styles.searchResultsDropdown}>
              <div className={styles.resultsGrid}>
                <div className={styles.resultsHeader}>Database matches found:</div>
                {filteredSymptoms.map((sym) => (
                  <button
                    key={sym.name}
                    className={styles.resultItem}
                    onClick={() => {
                      handleSymptomClick(sym);
                      setSearchQuery("");
                    }}
                  >
                    🌿 {sym.name} (Recommended: {sym.medicineName})
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.aiPromptContainer}>
              <div className={styles.aiPromptIconWrapper}>
                <AiOutlineRobot className={styles.aiPromptIcon} />
              </div>
              <div className={styles.aiPromptTextWrapper}>
                <h4>No Exact Database Match Found</h4>
                <p>Consult our virtual AI Vaidya to receive a personalized Ayurvedic analysis and remedy for "{searchQuery}".</p>
              </div>
              <button className={styles.aiConsultBtn} onClick={() => handleAIConsult()}>
                Consult AI Vaidya
              </button>
            </div>
          )}
        </>
      )}

      {/* Core Categories Selector */}
      <div className={styles.categoriesContainer}>
        <h3 className={styles.categoriesTitle}>Browse Main Categories</h3>
        <div className={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className={`${styles.categoryButton} ${
                activeCategory?.name === cat.name ? styles.categoryActive : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              <span className={styles.catIcon}>{cat.icon}</span>
              <span className={styles.catName}>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Sub-categories (symptoms) matching active category */}
        {activeCategory && !loading && (
          <div className={styles.subCategoriesRow}>
            {activeCategory.symptoms.map((symName) => {
              const symObj = symptoms.find((s) => s.name === symName);
              if (!symObj) return null;
              return (
                <button
                  key={symName}
                  className={`${styles.subCategoryButton} ${
                    selectedSymptom?.name === symName ? styles.subCategoryActive : ""
                  }`}
                  onClick={() => handleSymptomClick(symObj)}
                >
                  {symName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      {/* Loading state for AI */}
      {aiLoading && (
        <div className={styles.aiLoadingContainer}>
          <div className={styles.aiLoadingPulse}>
            <div className={styles.spinner}></div>
            <AiOutlineRobot className={styles.aiLoadingRobotIcon} />
          </div>
          <h3>AI Vaidya is analyzing...</h3>
          <p>Consulting classical Ayurvedic texts and formulating natural recommendations for your health balance.</p>
        </div>
      )}

      {/* Detail Section Display */}
      {selectedSymptom && !aiLoading && (
        <>
          <div className={styles.detailsSection}>
            <div className={styles.flexContainer}>
              <div className={styles.imageContainer}>
                <div className={styles.remedyBadge}>RECOMMENDED REMEDY</div>
                <img
                  src={
                    selectedSymptom.image
                      ? selectedSymptom.image.startsWith("http")
                        ? selectedSymptom.image
                        : `/images/${selectedSymptom.image}`
                      : "/images/default_medicine.png"
                  }
                  alt={`${selectedSymptom.name} Medicine`}
                  className={styles.medicineImage}
                  onError={(e) => {
                    e.target.src = "/images/default_medicine.png";
                  }}
                />
              </div>

              <div className={styles.productDetailsBox}>
                <div className={styles.productMetaTags}>
                  <span className={styles.metaTagStock}>In stock</span>
                  {selectedSymptom.ayurvedic_medicine?.form && (
                    <span className={styles.metaTagForm}>{selectedSymptom.ayurvedic_medicine.form}</span>
                  )}
                  {selectedSymptom.ayurvedic_medicine?.brand && (
                    <span className={styles.metaTagBrand}>{selectedSymptom.ayurvedic_medicine.brand}</span>
                  )}
                </div>

                <h3 className={styles.detailsHeading}>
                  {selectedSymptom.medicine || "Custom Ayurvedic Remedy"}
                </h3>

                {selectedSymptom?.ayurvedic_medicine && (
                  <p className={styles.weightPrice}>
                    {selectedSymptom.ayurvedic_medicine.price || "Check Price"}
                    <span className={styles.netWeightText}> ({selectedSymptom.ayurvedic_medicine.net_weight || "Standard Pack"})</span>
                  </p>
                )}

                <div className={styles.productDescription}>
                  {selectedSymptom.description ? (
                    selectedSymptom.description.split("\n").map((para, i) => (
                      <p key={i} style={{ marginBottom: "10px" }}>{para}</p>
                    ))
                  ) : (
                    <p style={{ marginBottom: "10px" }}>
                      This is a clinically-tested Ayurvedic formulation traditionally recommended for {selectedSymptom.name}. Explore the details below for beneficial herbs and usage instructions.
                    </p>
                  )}
                </div>

                {selectedSymptom.ayurvedic_medicine?.benefits?.length > 0 && (
                  <div className={styles.keySection}>
                    <h4 className={styles.smallHeading}>Key Benefits</h4>
                    <ul className={styles.benefitsList}>
                      {selectedSymptom.ayurvedic_medicine.benefits.map(
                        (benefit, index) => <li key={index}>✨ {benefit}</li>
                      )}
                    </ul>
                  </div>
                )}

                {selectedSymptom.ayurvedic_medicine?.ingredients?.length > 0 && (
                  <div className={styles.keySection}>
                    <h4 className={styles.smallHeading}>Key Ingredients</h4>
                    <p className={styles.ingredientsLine}>
                      {selectedSymptom.ayurvedic_medicine.ingredients.join(", ")}
                    </p>
                  </div>
                )}

                {selectedSymptom.ayurvedic_medicine?.safety_information && (
                  <div className={styles.keySection}>
                    <h4 className={styles.smallHeading}>Safety Information</h4>
                    {selectedSymptom.ayurvedic_medicine.safety_information.precautions?.length > 0 && (
                      <ul className={styles.precautionsList}>
                        {selectedSymptom.ayurvedic_medicine.safety_information.precautions.map(
                          (precaution, index) => <li key={index}>⚠️ {precaution}</li>
                        )}
                      </ul>
                    )}
                    {selectedSymptom.ayurvedic_medicine.safety_information.side_effects && (
                      <p className={styles.sideEffectsText}>
                        <strong>Side effects:</strong> {selectedSymptom.ayurvedic_medicine.safety_information.side_effects}
                      </p>
                    )}
                  </div>
                )}

                <div className={styles.actions}>
                  <button
                    className={styles.buyButton}
                    onClick={() => window.open(selectedSymptom.link, "_blank")}
                  >
                    Buy Remedy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Ayurvedic Treatment details */}
          <div className={styles.vidhiSection}>
            <div className={styles.vidhiHeader}>
              <span className={styles.vidhiBadge}>HOLISTIC TREATMENT</span>
              <h3 className={styles.vidhiHeading}>
                आयुर्वेदिक उपचार (Ayurvedic Treatment Guidelines)
              </h3>
            </div>

            <div className={styles.upcharGrid}>
              {/* Herb Card */}
              {selectedSymptom?.Herbs?.length > 0 && (
                <div className={styles.upcharCard}>
                  <div className={styles.upcharCardHeader}>
                    <span className={styles.cardHeaderIcon}>🌿</span>
                    <h4>उपयोगी जड़ी-बूटियाँ (Herbs)</h4>
                  </div>
                  <p className={styles.ingredientsLine}>
                    {selectedSymptom.Herbs.join(", ")}
                  </p>
                </div>
              )}

              {/* Upchar Card */}
              {selectedSymptom?.ayurvedic_upchar?.length > 0 && (
                <div className={styles.upcharCard}>
                  <div className={styles.upcharCardHeader}>
                    <span className={styles.cardHeaderIcon}>🧘</span>
                    <h4>चिकित्सा गाइड (Therapies & Upchar)</h4>
                  </div>
                  <ul className={styles.cardList}>
                    {selectedSymptom.ayurvedic_upchar.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vidhi Card */}
              {selectedSymptom?.vidhi?.length > 0 && (
                <div className={styles.upcharCard}>
                  <div className={styles.upcharCardHeader}>
                    <span className={styles.cardHeaderIcon}>🍯</span>
                    <h4>बनाने की विधि (Preparation)</h4>
                  </div>
                  <ol className={styles.cardListOrdered}>
                    {selectedSymptom.vidhi.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Usage Card */}
              {selectedSymptom?.usage?.length > 0 && (
                <div className={styles.upcharCard}>
                  <div className={styles.upcharCardHeader}>
                    <span className={styles.cardHeaderIcon}>🕒</span>
                    <h4>उपयोग कैसे करें (Usage Directions)</h4>
                  </div>
                  <ul className={styles.cardList}>
                    {selectedSymptom.usage.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Duration Card */}
              {selectedSymptom?.duration?.length > 0 && (
                <div className={styles.upcharCard}>
                  <div className={styles.upcharCardHeader}>
                    <span className={styles.cardHeaderIcon}>📆</span>
                    <h4>अवधि (Treatment Duration)</h4>
                  </div>
                  <ul className={styles.cardList}>
                    {selectedSymptom.duration.map((dur, index) => (
                      <li key={index}>{dur}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SymptomPage;

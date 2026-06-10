import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import api from "../../services/api";
import ProductCard from "../../components/common/ProductCard";
import styles from "./Homepage.module.css";
import { AiOutlineSearch, AiFillFire, AiOutlineCompass, AiOutlineHistory, AiOutlineCheck, AiFillStar } from "react-icons/ai";

function Homepage() {
  const navigate = useNavigate();
  const { 
    user,
    recentlyViewed, 
    addRecentlyViewed, 
    doshaProfile, 
    setDoshaProfile,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchResults, setSearchResults] = useState(null);
  const [showDoshaModal, setShowDoshaModal] = useState(false);

  // Dosha Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);

  // Load products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Search Input
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      try {
        const results = await api.search(query);
        setSearchResults(results);
      } catch (err) {
        console.error("Search failed:", err);
      }
    } else {
      setSearchResults(null);
    }
  };

  const categories = [
    { name: "All", label: "All Products" },
    { name: "Respiration", label: "Respiratory" },
    { name: "Digestion", label: "Digestion" },
    { name: "Joint Pain", label: "Joints & Muscle" },
    { name: "Stress", label: "Mind & Sleep" },
    { name: "Immunity", label: "Immunity" },
  ];

  const handleMoreDetails = (product) => {
    addRecentlyViewed(product);
    navigate("/detailpage", { state: { product } });
  };

  const handleGoToSymptoms = () => {
    navigate("/symptoms", { state: { searchQuery } });
  };

  // Simple dynamic Dosha Quiz questions
  const quizQuestions = [
    {
      q: "Which best describes your physical frame?",
      options: [
        { text: "Lean, active, or hard to gain weight (Vata)", dosha: "Vata" },
        { text: "Medium built, athletic, gains/loses weight easily (Pitta)", dosha: "Pitta" },
        { text: "Broad built, strong structure, gains weight easily (Kapha)", dosha: "Kapha" }
      ]
    },
    {
      q: "How does your digestive system react?",
      options: [
        { text: "Irregular, gas, bloating common (Vata)", dosha: "Vata" },
        { text: "Strong appetite, hyperacidity or warm body (Pitta)", dosha: "Pitta" },
        { text: "Slow digestion, feels heavy after meals (Kapha)", dosha: "Kapha" }
      ]
    },
    {
      q: "What is your typical sleep pattern?",
      options: [
        { text: "Light sleep, active thoughts, easily disturbed (Vata)", dosha: "Vata" },
        { text: "Moderate sleep, dreams intensely, easily wakes up warm (Pitta)", dosha: "Pitta" },
        { text: "Deep sleep, heavy sleeper, finds it hard to wake up (Kapha)", dosha: "Kapha" }
      ]
    }
  ];

  const handleQuizAnswer = (dosha) => {
    const newAnswers = [...quizAnswers, dosha];
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const counts = newAnswers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setDoshaProfile(dominant);
      setShowDoshaModal(false);
      setQuizStep(0);
      setQuizAnswers([]);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "All") return true;
    
    const categoryLower = activeCategory.toLowerCase();
    const nameLower = p.name.toLowerCase();
    const descLower = p.description.toLowerCase();

    if (categoryLower === "respiration") {
      return nameLower.includes("breathe") || nameLower.includes("cough") || nameLower.includes("swasari") || nameLower.includes("kwath");
    }
    if (categoryLower === "digestion") {
      return nameLower.includes("churna") || descLower.includes("digestive") || descLower.includes("constipation");
    }
    if (categoryLower === "joint pain") {
      return nameLower.includes("peedantak") || descLower.includes("joint") || descLower.includes("pain");
    }
    if (categoryLower === "stress") {
      return nameLower.includes("medha") || nameLower.includes("ashwagan") || descLower.includes("anxiety") || descLower.includes("sleep");
    }
    if (categoryLower === "immunity") {
      return nameLower.includes("immunogrit") || nameLower.includes("chyawanaprasam") || descLower.includes("immunity");
    }
    return true;
  });

  return (
    <main className={styles.homepageContainer}>
      {/* Premium Hero Section */}
      <header className={styles.heroSection}>
        {/* Decorative background ambient glows */}
        <div className={styles.ambientGlow1}></div>
        <div className={styles.ambientGlow2}></div>

        <div className={styles.heroGrid}>
          {/* Left Column: Text & Controls */}
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              {user ? `Namaste, ${user.username}` : "Modern Ayurvedic Diagnostics"}
            </div>
            <h1 className={styles.heroTitle}>
              Discover <span className={styles.gradientTextPrimary}>Balance</span>.<br />
              Embrace <span className={styles.gradientTextSecondary}>Holistic Wellness</span>.
            </h1>
            <p className={styles.heroSubtitle}>
              Unlock clinical Ayurveda powered by secure AI search models, personalized Dosha matching feeds, and verified organic remedies.
            </p>

            {/* Unified search bar */}
            <div className={styles.searchContainer}>
              <div className={styles.searchBarWrapper}>
                <AiOutlineSearch 
                  className={styles.searchIcon} 
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate("/symptoms", { state: { searchQuery } });
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Search symptoms, herbs, or remedies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      navigate("/symptoms", { state: { searchQuery } });
                    }
                  }}
                  className={styles.searchInput}
                />
              </div>

              {/* Quick Suggestion Tags */}
              <div className={styles.searchTags}>
                <span className={styles.tagLabel}>Popular:</span>
                <button 
                  type="button" 
                  className={styles.tagButton} 
                  onClick={() => {
                    const val = "constipation";
                    setSearchQuery(val);
                    api.search(val).then(results => setSearchResults(results)).catch(err => console.error(err));
                  }}
                >
                  Digestion
                </button>
                <button 
                  type="button" 
                  className={styles.tagButton} 
                  onClick={() => {
                    const val = "cough";
                    setSearchQuery(val);
                    api.search(val).then(results => setSearchResults(results)).catch(err => console.error(err));
                  }}
                >
                  Respiratory
                </button>
                <button 
                  type="button" 
                  className={styles.tagButton} 
                  onClick={() => {
                    const val = "ashwagandha";
                    setSearchQuery(val);
                    api.search(val).then(results => setSearchResults(results)).catch(err => console.error(err));
                  }}
                >
                  Stress & sleep
                </button>
              </div>

              {/* Autocomplete suggestion drop-down */}
              {searchResults && (
                <div className={styles.searchDropdown}>
                  {searchResults.diseases?.length > 0 && (
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownHeading}>Symptoms & Remedies</div>
                      {searchResults.diseases.map((d) => (
                        <div 
                          key={d.name} 
                          className={styles.dropdownItem}
                          onClick={() => {
                            navigate("/symptoms", { state: { selectedSymptomName: d.name } });
                            setSearchQuery("");
                            setSearchResults(null);
                          }}
                        >
                          <strong>{d.name}</strong> - Recommended: {d.medicineName}
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.products?.length > 0 && (
                    <div className={styles.dropdownSection}>
                      <div className={styles.dropdownHeading}>Medicines & Products</div>
                      {searchResults.products.map((p) => (
                        <div 
                          key={p.name} 
                          className={styles.dropdownItem}
                          onClick={() => {
                            handleMoreDetails(p);
                            setSearchQuery("");
                            setSearchResults(null);
                          }}
                        >
                          {p.name} ({p.price})
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.products?.length === 0 && searchResults.diseases?.length === 0 && (
                    <div className={styles.noResultsItem}>No matches found. Try searching a different keyword.</div>
                  )}
                </div>
              )}
            </div>

            {/* Call-to-actions */}
            <div className={styles.heroActions}>
              <button className={styles.btnPrimary} onClick={handleGoToSymptoms}>
                Symptoms Assessment
              </button>
              <button className={styles.btnSecondary} onClick={() => setShowDoshaModal(true)}>
                Analyze My Dosha
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustIndicators}>
              <span className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span> AI-Powered Analysis
              </span>
              <span className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span> AYUSH Certified Remedies
              </span>
              <span className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span> 100% Organic & Pure
              </span>
            </div>

            {doshaProfile !== "Unknown" && (
              <div className={styles.doshaPill}>
                Your Active Dosha Profile: <strong>{doshaProfile}</strong>
              </div>
            )}
          </div>

          {/* Right Column: Layered Spices Image Canvas */}
          <div className={styles.heroRight}>
            <div className={styles.imageCanvasContainer}>
              {/* Pulsating Organic Shape Background */}
              <div className={styles.organicBlobBackdrop}></div>
              
              {/* Soft Ambient Radial Light Behind Image */}
              <div className={styles.imageGlowRadial}></div>

              {/* Main Image */}
              <div className={styles.heroImageWrapper}>
                <img 
                  src="/images/hero_herbs.png" 
                  alt="Ayurvedic Spices and Herbs" 
                  className={styles.heroImage}
                />
              </div>

              {/* Floating Widget 1: 100% Organic Certification */}
              <div className={`${styles.floatingWidget} ${styles.widgetLeft}`}>
                <div className={styles.widgetIconWrapper}>
                  <AiOutlineCheck style={{ color: "#1d531f" }} />
                </div>
                <div className={styles.widgetTextWrapper}>
                  <div className={styles.widgetTitle}>100% Organic</div>
                  <div className={styles.widgetSubtitle}>Certified Pure Herbs</div>
                </div>
              </div>

              {/* Floating Widget 2: Star Ratings */}
              <div className={`${styles.floatingWidget} ${styles.widgetRight}`}>
                <div className={styles.widgetIconWrapper}>
                  <AiFillStar style={{ color: "#e2a94f" }} />
                </div>
                <div className={styles.widgetTextWrapper}>
                  <div className={styles.widgetTitle}>4.9/5 Rating</div>
                  <div className={styles.widgetSubtitle}>12k+ Happy Patients</div>
                </div>
              </div>

              {/* Floating Widget 3: Live Health Assistant Status */}
              <div className={styles.widgetLiveStatus}>
                <span className={styles.pulseDot}></span>
                <span className={styles.widgetLiveText}>Live AI Expert Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Advertisement Banner */}
      <section className={styles.adBannerSection}>
        <div className={styles.adBannerContent}>
          <div className={styles.adBannerLeft}>
            <span className={styles.adBadge}>LIMITED PERIOD OFFER</span>
            <h2 className={styles.adTitle}>Consult Our Virtual Vaidya & Get 15% Off</h2>
            <p className={styles.adDescription}>
              Unlock holistic Ayurvedic healing with personalized Dosha-balancing remedies, organic herbs, and clinically approved wellness plans. Use code <strong className={styles.adCode}>VAIDYA15</strong> at checkout.
            </p>
          </div>
          <div className={styles.adBannerRight}>
            <button className={styles.adCtaBtn} onClick={handleGoToSymptoms}>
              Start Free Consultation
            </button>
          </div>
        </div>
      </section>


      {/* Featured Botanical Spotlight (Replaces Recently Viewed Products) */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <AiOutlineCompass className={styles.sectionIcon} />
          <h2>Featured Botanical Spotlight</h2>
        </div>
        <div className={styles.spotlightCard}>
          {/* Left: Phyto-chemical & Ayurvedic profile */}
          <div className={styles.spotlightLeft}>
            <span className={styles.spotlightBadge}>Herb of the Month</span>
            <h3 className={styles.spotlightTitle}>Ashwagandha (Withania somnifera) — अश्वगंधा</h3>
            <p className={styles.spotlightDesc}>
              Regarded as the "King of Ayurvedic Herbs," Ashwagandha is a powerful adaptogen (Rasayana) that has been used for over 3,000 years to relieve stress, increase energy levels, and improve concentration.
            </p>
            
            <div className={styles.spotlightPropertiesGrid}>
              <div className={styles.propertyItem}>
                <div className={styles.propertyLabel}>Rasa (Taste)</div>
                <div className={styles.propertyValue}>Bitter, Sweet, Astringent</div>
              </div>
              <div className={styles.propertyItem}>
                <div className={styles.propertyLabel}>Virya (Potency)</div>
                <div className={styles.propertyValue}>Ushna (Heating)</div>
              </div>
              <div className={styles.propertyItem}>
                <div className={styles.propertyLabel}>Dosha Karma</div>
                <div className={styles.propertyValue}>Balances Vata & Kapha</div>
              </div>
            </div>

            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                <span><strong>Neuroprotective:</strong> Supports healthy cortisol levels and calms the nervous system.</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                <span><strong>Bioactive Strength:</strong> Rich in Withanolides, the active molecules supporting cell defense.</span>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                <span><strong>Ojas Enhancer:</strong> Promotes natural vitality, muscle recovery, and sleep quality.</span>
              </div>
            </div>
          </div>

          {/* Right: Glassmorphic Phyto Card */}
          <div className={styles.spotlightRight}>
            <div className={styles.phytoCard}>
              <div className={styles.phytoTitle}>Phyto-Chemical Profile</div>
              <div className={styles.barGroup}>
                <div className={styles.barLabel}>Withanolides (Adaptogenic) <span>5.2%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: "85%" }}></div></div>
              </div>
              <div className={styles.barGroup}>
                <div className={styles.barLabel}>Alkaloids (Calming) <span>3.8%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: "70%" }}></div></div>
              </div>
              <div className={styles.barGroup}>
                <div className={styles.barLabel}>Saponins (Immune) <span>2.1%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: "55%" }}></div></div>
              </div>
              <div className={styles.certBlock}>
                <span>✓ HPLC Certified Extract</span>
                <span>✓ 100% Water Soluble</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Philosophy Section */}
      <section className={styles.philosophySection}>
        <div className={styles.sectionHeader}>
          <AiOutlineCompass className={styles.sectionIcon} />
          <h2>The Matrico Wellness Philosophy</h2>
        </div>
        <div className={styles.philosophyGrid}>
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyIcon}>🌱</div>
            <h3>100% Pure & Organic Herbs</h3>
            <p>Our ingredients are directly harvested from certified organic farms in the foothills of the Himalayas, preserving natural potency.</p>
          </div>
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyIcon}>🔬</div>
            <h3>Scientific Standardization</h3>
            <p>Each formulation undergoes rigid lab checks to guarantee standardized bioactive extracts without heavy metals or chemical fillers.</p>
          </div>
          <div className={styles.philosophyCard}>
            <div className={styles.philosophyIcon}>🧘</div>
            <h3>Holistic Personalization</h3>
            <p>Ayurveda recognizes that you are unique. Our tools match remedies to your individual Dosha profile for real healing results.</p>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <AiFillFire className={styles.sectionIcon} />
          <h2>Our Ayurvedic Medicine Collection</h2>
        </div>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
            <p>Loading medical catalog...</p>
          </div>
        ) : (
          <div className={styles.catalogGrid}>
            {filteredProducts.map((prod) => (
              <ProductCard 
                key={prod._id || prod.name} 
                product={prod} 
                onDetailsClick={handleMoreDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Dosha Quiz Modal */}
      {showDoshaModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowDoshaModal(false)}>✖</button>
            <h3>Ayurvedic Dosha Assessment</h3>
            <div className={styles.quizProgress}>
              Step {quizStep + 1} of {quizQuestions.length}
            </div>
            
            <div className={styles.quizQuestionBox}>
              <p className={styles.quizQuestionText}>
                {quizQuestions[quizStep].q}
              </p>
              <div className={styles.quizOptions}>
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button 
                    key={i} 
                    className={styles.quizOptButton}
                    onClick={() => handleQuizAnswer(opt.dosha)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Homepage;

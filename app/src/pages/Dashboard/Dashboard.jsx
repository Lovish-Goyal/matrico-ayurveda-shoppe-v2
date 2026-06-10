import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { useUser } from "../../utils/UserContext";
import {
  AiOutlineUser,
  AiOutlineLineChart,
  AiOutlineHeart,
  AiOutlineCalendar,
  AiOutlineSetting,
  AiOutlineSmile,
  AiOutlineCheckCircle,
  AiOutlineArrowRight,
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineMedicineBox,
  AiOutlineHistory,
  AiOutlineStar,
  AiOutlineFieldTime
} from "react-icons/ai";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const { doshaProfile, setDoshaProfile, recentlyViewed } = useStore();
  const [activeTab, setActiveTab] = useState("home");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Mocking some rich interactive state for goals
  const [goals, setGoals] = useState({
    sleep: { current: 75, target: 100, label: "Restorative Sleep Schedule" },
    digestion: { current: 90, target: 100, label: "Sattvic Diet Alignment" },
    stress: { current: 60, target: 100, label: "Daily Pranayama Breathwork" },
    immunity: { current: 85, target: 100, label: "Rasayana Rejuvenation Supplement" }
  });

  const [assessmentHistory, setAssessmentHistory] = useState([
    { date: "June 08, 2026", type: "Dosha Assessment", result: "Primary Dosha: Vata (Balanced)" },
    { date: "June 05, 2026", type: "Symptom Analysis", result: "Dry Cough -> Recommended Swasari Pravahi" },
    { date: "May 28, 2026", type: "Symptom Analysis", result: "Indigestion -> Recommended Shuddhi Churna" }
  ]);

  const [profileSettings, setProfileSettings] = useState({
    username: user.username,
    email: user.email,
    language: "en",
    focus: "immunity",
    notifications: true
  });

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateUser({ username: profileSettings.username, email: profileSettings.email });
    alert("Profile settings saved successfully!");
  };

  const handleGoalCheck = (key) => {
    setGoals((prev) => {
      const currentVal = prev[key].current;
      const nextVal = currentVal >= 100 ? 50 : currentVal + 10;
      return {
        ...prev,
        [key]: { ...prev[key], current: nextVal }
      };
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarProfile}>
          <div className={styles.avatar}>
            <AiOutlineUser />
          </div>
          <h3>{user.username}</h3>
          <span className={styles.profileBadge}>Active Practitioner</span>
        </div>

        <nav className={styles.sidebarMenu}>
          <button
            className={`${styles.menuItem} ${activeTab === "home" ? styles.active : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <AiOutlineDashboard /> Home Overview
          </button>
          <button
            className={`${styles.menuItem} ${activeTab === "dosha" ? styles.active : ""}`}
            onClick={() => setActiveTab("dosha")}
          >
            <AiOutlineSmile /> My Dosha Profile
          </button>
          <button
            className={`${styles.menuItem} ${activeTab === "history" ? styles.active : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <AiOutlineHistory /> Assessment History
          </button>
          <button
            className={`${styles.menuItem} ${activeTab === "tips" ? styles.active : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            <AiOutlineCalendar /> Daily Ayurvedic Tips
          </button>
          <button
            className={`${styles.menuItem} ${activeTab === "goals" ? styles.active : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            <AiOutlineLineChart /> Health Goals
          </button>
          <button
            className={`${styles.menuItem} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <AiOutlineSetting /> Profile Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        
        {/* TAB 1: HOME OVERVIEW */}
        {activeTab === "home" && (
          <div className={styles.tabContent}>
            <div className={styles.welcomeBanner}>
              <h1>Namaste, {user.username}!</h1>
              <p>Your Ayurvedic wellness path is active. Review your health metrics, Dosha alignments, and customized clinical guides.</p>
              <div className={styles.bannerActions}>
                <button className={styles.btnAction} onClick={() => navigate("/symptoms")}>
                  Start Diagnostics <AiOutlineArrowRight />
                </button>
                <button className={styles.btnActionSecondary} onClick={() => setActiveTab("dosha")}>
                  Analyze Dosha
                </button>
              </div>
            </div>

            <div className={styles.metricsGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
              {/* Metric 1: Dosha */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <h3>Primary Dosha</h3>
                  <span className={styles.metricIcon}><AiOutlineSmile /></span>
                </div>
                <div className={styles.metricValue}>{doshaProfile}</div>
                <p className={styles.metricLabel}>
                  {doshaProfile !== "Unknown" 
                    ? "Your biological constitution is balanced."
                    : "Complete the quiz to find your primary Dosha."}
                </p>
                <button className={styles.cardCta} onClick={() => setActiveTab("dosha")}>View Details</button>
              </div>

              {/* Metric 2: Goals */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <h3>Active Goals</h3>
                  <span className={styles.metricIcon}><AiOutlineLineChart /></span>
                </div>
                <div className={styles.metricValue}>4 Active</div>
                <p className={styles.metricLabel}>Averages: 78% completion across sleep, stress, and digestion.</p>
                <button className={styles.cardCta} onClick={() => setActiveTab("goals")}>Track Progress</button>
              </div>
            </div>

            {/* Daily Wisdom Widget */}
            <div className={styles.widgetCard} style={{ width: "100%" }}>
              <h2>Personalized Wisdom Feed</h2>
              <div className={styles.tipPreview}>
                <div className={styles.tipHeader}>
                  <span className={styles.tipTag}>Morning Ritual</span>
                  <span className={styles.tipTime}>Ushapan</span>
                </div>
                <h3>उषापान (Morning Water Cleansing)</h3>
                <p>Drinking copper-charged lukewarm water immediately upon waking stimulates digestion, clears kidney pathways, and balances Vata. Consume before brushing teeth.</p>
                <button className={styles.textLink} onClick={() => setActiveTab("tips")}>
                  Read full daily guide <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY DOSHA PROFILE */}
        {activeTab === "dosha" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <h1>My Dosha Profile</h1>
              <p>Understand your Prakriti (biological constitution) and current balance (Vikriti).</p>
            </div>

            {doshaProfile === "Unknown" ? (
              <div className={styles.profileAlertCard}>
                <h2>Dosha Profile is Unanalyzed</h2>
                <p>Ayurvedic therapies require understanding your Prakriti (Vata, Pitta, or Kapha composition). Click below to take our quick visual quiz.</p>
                <button 
                  className={styles.btnAction}
                  onClick={() => {
                    navigate("/");
                    // Open modal on homepage
                    setTimeout(() => {
                      const btn = document.querySelector('[class*="btnSecondary"]');
                      if (btn) btn.click();
                    }, 500);
                  }}
                >
                  Analyze My Dosha Now
                </button>
              </div>
            ) : (
              <div className={styles.doshaAnalysisBox}>
                <div className={styles.doshaGrid}>
                  {/* Left: Interactive Visualizer Chart */}
                  <div className={styles.doshaChartBox}>
                    <h3>Biometric Composition</h3>
                    <p className={styles.chartDesc}>Current estimated ratio of active energies in your physiology.</p>
                    
                    <div className={styles.barChart}>
                      <div className={styles.barGroup}>
                        <div className={styles.barHeader}>
                          <span>Vata (Wind & Ether)</span>
                          <strong>{doshaProfile === "Vata" ? "45%" : "30%"}</strong>
                        </div>
                        <div className={styles.barTrack}>
                          <div 
                            className={`${styles.barFill} ${styles.vataBar}`} 
                            style={{ width: doshaProfile === "Vata" ? "45%" : "30%" }}
                          ></div>
                        </div>
                      </div>

                      <div className={styles.barGroup}>
                        <div className={styles.barHeader}>
                          <span>Pitta (Fire & Water)</span>
                          <strong>{doshaProfile === "Pitta" ? "45%" : "30%"}</strong>
                        </div>
                        <div className={styles.barTrack}>
                          <div 
                            className={`${styles.barFill} ${styles.pittaBar}`} 
                            style={{ width: doshaProfile === "Pitta" ? "45%" : "30%" }}
                          ></div>
                        </div>
                      </div>

                      <div className={styles.barGroup}>
                        <div className={styles.barHeader}>
                          <span>Kapha (Water & Earth)</span>
                          <strong>{doshaProfile === "Kapha" ? "45%" : "30%"}</strong>
                        </div>
                        <div className={styles.barTrack}>
                          <div 
                            className={`${styles.barFill} ${styles.kaphaBar}`} 
                            style={{ width: doshaProfile === "Kapha" ? "45%" : "30%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.statusBox}>
                      <AiOutlineCheckCircle className={styles.statusIcon} />
                      <div>
                        <strong>Status: Balanced Vikriti</strong>
                        <p>Your current active energies align close to your base constitution.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Insights & Guidelines */}
                  <div className={styles.doshaInsights}>
                    <h3>Insights for Primary {doshaProfile}</h3>
                    <p className={styles.insightsIntro}>
                      {doshaProfile === "Vata" && "Vata is characterized by dry, cold, light, and hyperactive energy. Balancing Vata involves unctuous, warm, and highly grounding routines."}
                      {doshaProfile === "Pitta" && "Pitta represents metabolism, heat, and sharp intellect. Balancing Pitta requires cooling, soothing, and moderately unctuous nutrition."}
                      {doshaProfile === "Kapha" && "Kapha governs physical structure, hydration, and stability. Balancing Kapha entails light, warming, stimulating, and dry regimens."}
                    </p>

                    <div className={styles.insightSegment}>
                      <h4>Optimal Diet Preferences</h4>
                      <p>
                        {doshaProfile === "Vata" && "Focus on warm soups, cooked grains with ghee, sweet root vegetables, and herbal teas. Avoid raw salads and cold drinks."}
                        {doshaProfile === "Pitta" && "Prioritize sweet fruits (peaches, melons), cooling vegetables (cucumbers, leafy greens), and coconut. Limit spices and alcohol."}
                        {doshaProfile === "Kapha" && "Enjoy bitter, astringent, and spicy foods. Incorporate ginger, garlic, beans, and light grains (quinoa). Limit dairy and sweets."}
                      </p>
                    </div>

                    <div className={styles.insightSegment}>
                      <h4>Suggested Daily Rituals</h4>
                      <p>
                        {doshaProfile === "Vata" && "Establish regular schedules. Perform daily warm sesame oil massage (Abhyanga) and do 10 minutes of grounding yoga nidra."}
                        {doshaProfile === "Pitta" && "Practice moderate, non-competitive exercise in the morning. Rub coconut oil on soles and temples for cooling rest."}
                        {doshaProfile === "Kapha" && "Wake early (by 6 AM). Perform vigorous exercise, dry body brush massage (Garshana), and take warm ginger tea."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.retestBox}>
                  <p>Feel like your energy has shifted? You can retake the assessment quiz to refresh your profile details.</p>
                  <button 
                    className={styles.btnActionSecondary}
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => {
                        const btn = document.querySelector('[class*="btnSecondary"]');
                        if (btn) btn.click();
                      }, 500);
                    }}
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HEALTH ASSESSMENT HISTORY */}
        {activeTab === "history" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <h1>Health Assessment History</h1>
              <p>Log of previous consultations, symptom checks, and prescribed formulations.</p>
            </div>

            <div className={styles.historyTableContainer}>
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Assessment Type</th>
                    <th>Result & Prescriptions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td className={styles.historyDate}>{item.date}</td>
                      <td>
                        <span className={styles.historyTypeBadge}>
                          {item.type}
                        </span>
                      </td>
                      <td className={styles.historyResult}>{item.result}</td>
                      <td>
                        <button 
                          className={styles.btnTableAction}
                          onClick={() => {
                            if (item.result.includes("Swasari")) {
                              navigate("/symptoms");
                            } else if (item.result.includes("Vata")) {
                              setActiveTab("dosha");
                            } else {
                              navigate("/ayur_store");
                            }
                          }}
                        >
                          View Recommendation
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.historyNotice}>
              <AiOutlineMedicineBox className={styles.noticeIcon} />
              <p>Note: This platform suggests remedies based on traditional texts and redirects you to Amazon or Patanjali Store for purchases. We do not sell pharmaceuticals directly.</p>
            </div>
          </div>
        )}



        {/* TAB 5: DAILY AYURVEDIC TIPS */}
        {activeTab === "tips" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <h1>Daily Ayurvedic Tips & Wisdom Feed</h1>
              <p>Personalized lifestyle suggestions for your constitution to cultivate energy and clarity.</p>
            </div>

            <div className={styles.dailyTipsFeed}>
              {/* Tip 1 */}
              <div className={styles.tipFeedCard}>
                <div className={styles.tipFeedHeader}>
                  <span className={styles.tipFeedCategory}>HYDRATION</span>
                  <span className={styles.tipFeedLang}>उषापान (Ushapan)</span>
                </div>
                <h3>Morning Water Ritual</h3>
                <p>Drink 2 glasses of lukewarm copper-charged water immediately upon waking, before brushing your teeth. This flushes the kidney tract, stimulates peristalsis, and wakes up digestive enzymes.</p>
              </div>

              {/* Tip 2 */}
              <div className={styles.tipFeedCard}>
                <div className={styles.tipFeedHeader}>
                  <span className={styles.tipFeedCategory}>ORAL HEALTH</span>
                  <span className={styles.tipFeedLang}>गंडूष (Gandusha)</span>
                </div>
                <h3>Oil Pulling</h3>
                <p>Swish 1 tablespoon of organic sesame or coconut oil in your mouth for 10-15 minutes, then spit it out. This strengthens teeth, gums, and jaw while extracting fat-soluble toxins from saliva.</p>
              </div>

              {/* Tip 3 */}
              <div className={styles.tipFeedCard}>
                <div className={styles.tipFeedHeader}>
                  <span className={styles.tipFeedCategory}>CIRCULATION</span>
                  <span className={styles.tipFeedLang}>घर्षण (Garshana)</span>
                </div>
                <h3>Dry Brush Exfoliation</h3>
                <p>Use a raw silk or natural bristle brush to scrub your dry skin using long strokes towards the heart before bathing. This stimulates lymphatic drainage and removes dead skin cells.</p>
              </div>
            </div>

            <div className={styles.viewMoreTipsBox}>
              <p>Explore our complete library of 31 distinct monthly Ayurvedic daily wisdom cards.</p>
              <button className={styles.btnAction} onClick={() => navigate("/daily_tips")}>
                View All Monthly Tips
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: HEALTH GOALS */}
        {activeTab === "goals" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <h1>My Health Goals</h1>
              <p>Track your alignment metrics. Click on any category card to mark progress and complete checks.</p>
            </div>

            <div className={styles.goalsGrid}>
              {Object.entries(goals).map(([key, goal]) => (
                <div key={key} className={styles.goalCard} onClick={() => handleGoalCheck(key)}>
                  <div className={styles.goalHeader}>
                    <h3>{goal.label}</h3>
                    <span className={styles.goalPercent}>{goal.current}%</span>
                  </div>
                  <div className={styles.goalTrack}>
                    <div 
                      className={styles.goalBar} 
                      style={{ width: `${goal.current}%` }}
                    ></div>
                  </div>
                  <p className={styles.goalCtaLabel}>
                    {goal.current >= 100 
                      ? "Goal Fully Achieved! Click to reset." 
                      : "Tap card to log progress (+10%)"}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.goalsInsightsBox}>
              <h3>Vaidya Goal Advice</h3>
              <p>Maintaining a regular schedule is the primary therapy for balancing Vata. Aligning digestion with the solar cycle (largest meal at noon) and sleeping by 10:00 PM stabilizes physiological circadian rhythms.</p>
            </div>
          </div>
        )}



        {/* TAB 8: PROFILE SETTINGS */}
        {activeTab === "settings" && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <h1>Profile Settings & Preferences</h1>
              <p>Manage your account parameters, preferred notifications, and health focus.</p>
            </div>

            <form className={styles.settingsForm} onSubmit={handleSaveSettings}>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={profileSettings.username}
                  onChange={handleSettingsChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profileSettings.email}
                  onChange={handleSettingsChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Preferred Language</label>
                <select
                  name="language"
                  value={profileSettings.language}
                  onChange={handleSettingsChange}
                >
                  <option value="en">English (US/IN)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Primary Wellness Focus</label>
                <select
                  name="focus"
                  value={profileSettings.focus}
                  onChange={handleSettingsChange}
                >
                  <option value="immunity">Immunity & Rejuvenation</option>
                  <option value="digestion">Digestion & Gastric Health</option>
                  <option value="respiration">Respiratory Support</option>
                  <option value="joints">Joint Care & Muscle strength</option>
                  <option value="stress">Mind Calm & Sleep Optimization</option>
                </select>
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={profileSettings.notifications}
                  onChange={handleSettingsChange}
                />
                <label htmlFor="notifications">Receive personalized daily Ayurvedic tips notifications via email</label>
              </div>

              <button type="submit" className={styles.btnSave}>
                Save Profile Configuration
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

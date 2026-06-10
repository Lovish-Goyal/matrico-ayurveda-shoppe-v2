import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Navbar/Nav.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Aboutpage from "./pages/Aboutpage/Aboutpage.jsx";
import Contactpage from "./pages/Contactpage/Contactpage.jsx";
import AyurStore from "./pages/AyurStore/AyurStore.jsx";
import DailyTips from "./pages/Daily_Tips/Daily_Tips.jsx";
import Loginpage from "./components/Auth/Login/Loginpage.jsx";
import SignupPage from "./components/Auth/Signup/SignupPage.jsx";
import Footer from "./components/footer/footer.jsx";
import { UserProvider } from "./utils/UserContext.jsx";
import Detailpage from "./pages/DetailPage/Detailpage.jsx";
import SymptomPage from "./pages/symptoms/symptoms.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
// import PopupBanner from "./components/popup/popup.jsx";
import AyurvedaBot from "./components/ayurvedic_bot/ayurbot.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { useLocation } from "react-router-dom";

// Dynamic SEO page metadata handler
function SEOHandler() {
  const location = useLocation();

  React.useEffect(() => {
    let title = "Matrico Ayurveda Shoppe - Holistic Wellness & Natural Remedies";
    let description = "Discover natural Ayurvedic remedies, consult our AI Vaidya, browse verified symptom diagnostics, and shop certified pure organic herbal formulations.";

    switch (location.pathname) {
      case "/":
        title = "Matrico Ayurveda Shoppe - Holistic Wellness & Natural Remedies";
        description = "Discover natural Ayurvedic remedies, consult our AI Vaidya, browse verified symptom diagnostics, and shop certified pure organic herbal formulations.";
        break;
      case "/about":
        title = "About Us - Matrico Ayurveda Shoppe";
        description = "Learn about the philosophy, history, Himalayan source, and science-backed purity testing of Matrico Ayurveda Shoppe.";
        break;
      case "/contact":
        title = "Contact Us - Matrico Ayurveda Shoppe";
        description = "Get in touch with the Matrico team for questions, orders, bulk supplies, or medical queries.";
        break;
      case "/ayur_store":
        title = "Ayurvedic Medicine Store - Matrico Ayurveda Shoppe";
        description = "Shop organic and AYUSH certified Ayurvedic herbal juices, churnas, supplements, and wellness formulations online.";
        break;
      case "/daily_tips":
        title = "Ayurvedic Daily Health Tips - Matrico Ayurveda";
        description = "Read daily tips, routines (Dinacharya), and dietary practices based on ancient Ayurvedic textbooks for health balance.";
        break;
      case "/login":
        title = "Login - Matrico Ayurveda Shoppe";
        description = "Log in to access your personal Ayurvedic dashboard, active Dosha profiles, and wellness history.";
        break;
      case "/register":
        title = "Register - Matrico Ayurveda Shoppe";
        description = "Register an account to analyze your Dosha profile, get personalized AI consultations, and shop products.";
        break;
      case "/detailpage":
        title = "Product Details - Matrico Ayurveda Shoppe";
        description = "Explore safety information, active ingredients, dosage directions, and certified benefits of our Ayurvedic medicines.";
        break;
      case "/symptoms":
        title = "Symptom Diagnostics & AI Consultation - Matrico Ayurveda";
        description = "Search clinical symptoms, browse traditional remedies, or consult our AI Vaidya health assistant for natural suggestions.";
        break;
      case "/dashboard":
        title = "My Wellness Dashboard - Matrico Ayurveda";
        description = "View your active Dosha balance, wellness profile, recently viewed remedies, and recommended products.";
        break;
      default:
        break;
    }

    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <SEOHandler />
        <Nav />
        {/* <PopupBanner /> */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/ayur_store" element={<AyurStore />} />
          <Route path="/daily_tips" element={<DailyTips />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/detailpage" element={<Detailpage />} />
          <Route path="/symptoms" element={<SymptomPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
        <AyurvedaBot />
      </Router>
    </UserProvider>
  );
}

export default App;

import { useState } from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      setSnackbar("Please add your email address.");
    } else {
      // Simple email pattern check
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setSnackbar("Please enter a valid email address.");
      } else {
        setSnackbar("Subscribed successfully!");
        setEmail("");
      }
    }

    // Hide snackbar after 3 seconds
    setTimeout(() => {
      setSnackbar("");
    }, 3000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        {/* About Section */}
        <div className={styles.footerSection}>
          <h3>Metrico Ayurveda</h3>
          <p>
            Embrace holistic wellness with Metrico Ayurveda—your trusted source
            for authentic Ayurvedic products and natural remedies.
          </p>
          <p>
            📍 123 Ayurveda Lane, Wellness City, India <br />
            📞 +91 98765 43210 <br />
            ✉️ support@metricoayurveda.com
          </p>
        </div>

        {/* Navigation */}
        <div className={styles.footerSection} style={{ marginLeft: "40px" }}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/ayur_store">Ayure Store</Link>
            </li>
            <li>
              <Link to="/daily_tips">Ayurvedic Tips</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.footerSection}>
          <h4>Subscribe</h4>
          <p>
            Get exclusive health tips & special offers directly in your inbox.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.footerSection} style={{ marginLeft: "40px" }}>
          <h4>Connect With Us</h4>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/metricoayurveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/metricoayurveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.twitter.com/metricoayurveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/metricoayurveda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Metrico Ayurveda. All rights
          reserved.
        </p>
      </div>

      {/* Snackbar */}
      {snackbar && <div className={styles.snackbar}>{snackbar}</div>}
    </footer>
  );
}

export default Footer;

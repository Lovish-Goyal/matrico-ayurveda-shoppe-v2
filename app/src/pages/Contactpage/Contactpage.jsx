import React, { useState } from "react";
import styles from "./Contactpage.module.css";
import { 
  AiOutlineMail, 
  AiOutlinePhone, 
  AiOutlineEnvironment, 
  AiOutlineClockCircle,
  AiFillFacebook, 
  AiOutlineTwitter, 
  AiOutlineLinkedin, 
  AiOutlineInstagram 
} from "react-icons/ai";

function Contactpage() {
  const [contactUser, setContactUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactUser.username || !contactUser.email || !contactUser.message) {
      alert("All fields are required.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:7080";
      const response = await fetch(
        `${backendUrl}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactUser),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");
        setContactUser({ username: "", email: "", message: "" });
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          alert(errorData.message || "Something went wrong. Please try again.");
        } else {
          const errorText = await response.text();
          alert(errorText || "Something went wrong with status " + response.status);
        }
      }
    } catch (err) {
      alert("Error sending message. Please try again later.");
      console.error("Error:", err);
    }
  };

  return (
    <section className={styles.contact}>
      {/* Decorative ambient glows */}
      <div className={styles.ambientGlow1}></div>
      <div className={styles.ambientGlow2}></div>

      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Connect With Our Experts</h1>
        <p className={styles.pageSubTitle}>
          Have questions about your Dosha profile, symptoms, or organic remedies? Reach out to our certified Vaidyas and support team.
        </p>
      </div>

      <div className={styles.boxWrapper}>
        {/* Left Column: Premium Contact Information Cards */}
        <div className={styles.contactWrapper}>
          <div className={styles.infoTitleBlock}>
            <h2>Official Registry & Channels</h2>
            <p>We are approachable and dedicated to your holistic wellness journey.</p>
          </div>

          <div className={styles.infoCardsGrid}>
            {/* Email card */}
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <AiOutlineMail className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                <h3>Email Support</h3>
                <p>support@matricoayurveda.com</p>
                <p>care@matricoayurveda.com</p>
              </div>
            </div>

            {/* Phone card */}
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <AiOutlinePhone className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                <h3>Helpline & Consultation</h3>
                <p>+91 98765-43210 (Toll Free)</p>
                <p>+1 (123) 456-7890 (International)</p>
              </div>
            </div>

            {/* Address card */}
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <AiOutlineEnvironment className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                <h3>Research Center & Dispensary</h3>
                <p>405544 Sugar Camp Road, Ambala, Haryana, India</p>
              </div>
            </div>

            {/* Timings card */}
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <AiOutlineClockCircle className={styles.icon} />
              </div>
              <div className={styles.infoText}>
                <h3>Working Hours (IST)</h3>
                <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 2:00 PM</p>
                <p className={styles.closedDay}>Sunday: Closed for purification rituals</p>
              </div>
            </div>
          </div>

          {/* Social media connections */}
          <div className={styles.socialBlock}>
            <span>Follow Our Wellness Journal:</span>
            <ul className={styles.socialIcons}>
              <li>
                <a href="#" aria-label="Facebook">
                  <AiFillFacebook />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter">
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn">
                  <AiOutlineLinkedin />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <AiOutlineInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Premium Glassmorphic Form Card */}
        <div className={styles.contactForm}>
          <div className={styles.formHeader}>
            <h2>Leave a Message</h2>
            <p>Our Ayurvedic experts will evaluate your query and reply within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formBody}>
            <div className={styles.inputBox}>
              <label htmlFor="username">Full Name</label>
              <input
                id="username"
                type="text"
                name="username"
                value={contactUser.username}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className={styles.inputBox}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={contactUser.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="message">How can we assist you?</label>
              <textarea
                id="message"
                name="message"
                value={contactUser.message}
                onChange={handleInputChange}
                placeholder="Describe your symptoms, questions or order concerns..."
                rows={5}
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contactpage;

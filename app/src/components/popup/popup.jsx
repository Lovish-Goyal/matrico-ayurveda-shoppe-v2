import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./popupBanner.module.css";

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupBanner}>
      <div className={styles.popupContent}>
        <span className={styles.announcementText}>
          ⚡ <strong>Monsoon Wellness Special:</strong> Get flat <strong>30% OFF</strong> on all organic churna & herbal juices! Use code: <span className={styles.promoCode}>AYUR30</span>
        </span>
        <button className={styles.ctaLink} onClick={() => navigate("/ayur_store")}>
          Shop Remedies →
        </button>
        <button onClick={handleClose} className={styles.closeButton} aria-label="Close Promo Banner">
          ✕
        </button>
      </div>
    </div>
  );
};

export default PopupBanner;

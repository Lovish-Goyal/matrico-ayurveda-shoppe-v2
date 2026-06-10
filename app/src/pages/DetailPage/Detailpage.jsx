import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/common/ProductCard";
import styles from "./Detailpage.module.css";
import { AiOutlineArrowLeft, AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";

function Detailpage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  if (!state || !state.product) {
    return (
      <div className={styles.errorContainer}>
        <h2>No Product selected</h2>
        <button onClick={() => navigate("/")}>Go back Home</button>
      </div>
    );
  }

  const { product } = state;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const data = await api.getProducts();
        // Filter out current product and get 4 items
        const filtered = data
          .filter((p) => p.name !== product.name)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to load related products:", err);
      }
    };
    fetchRelated();
  }, [product.name]);

  const handleProductClick = (newProduct) => {
    navigate("/detailpage", { state: { product: newProduct } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      {/* Back navigation link */}
      <button className={styles.btnBack} onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft /> Back to catalog
      </button>

      {/* Main product columns */}
      <div className={styles.productGrid}>
        {/* Left Column: Image Card */}
        <div className={styles.imageCard}>
          <div className={styles.organicTag}>100% Pure</div>
          <img
            src={`/images/${product.imageSrc || product.src}`}
            alt={product.name}
            className={styles.productImg}
            onError={(e) => { e.target.src = "/images/default_medicine.png"; }}
          />
        </div>

        {/* Right Column: Information Sheet */}
        <div className={styles.infoColumn}>
          <span className={styles.categoryBadge}>Ayurvedic Formulation</span>
          <h1 className={styles.productName}>{product.name}</h1>
          
          {/* Reviews row */}
          <div className={styles.reviewsRow}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className={styles.starIcon} />
              ))}
            </div>
            <span className={styles.reviewsCount}>({product.reviews || "8 reviews"})</span>
          </div>

          {/* Pricing Box */}
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Best Price</span>
            <div className={styles.priceRow}>
              <span className={styles.priceValue}>{product.price}</span>
              <div className={styles.stockStatus}>
                <AiOutlineCheckCircle className={styles.checkIcon} />
                <span>In Stock</span>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className={styles.descSection}>
            <h3>About this Formulation</h3>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button
              className={styles.btnActionPrimary}
              onClick={() => window.open(product.link, "_blank")}
            >
              Order on Amazon
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Informational Sections */}
      <div className={styles.detailsDivider}></div>

      <div className={styles.expandedInfoSection}>
        {/* Section 1: Ingredients Profile */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2>Ingredients & Botanical Composition</h2>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.infoText}>
              This classical preparation is formulated using standard extraction techniques to concentrate the active phytochemical profiles of traditional Ayurvedic herbs.
            </p>
            <div className={styles.detailBlock}>
              <h4 className={styles.detailSubHeading}>Key Active Components</h4>
              <p className={styles.detailText}>
                {product.ingredients || "Standardized formulation including premium herbs processed in strict accordance with classical Ayurvedic pharmacopoeia guidelines."}
              </p>
            </div>
            <div className={styles.detailBlock}>
              <h4 className={styles.detailSubHeading}>Quality & Safety Standards</h4>
              <p className={styles.detailText}>
                Tested for heavy metals and pesticides. 100% natural, containing no artificial colors, chemical preservatives, or synthetic binders.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Usage Directions & Safety */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2>Usage & Vaidya Guidelines</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.infoGrid}>
              <div className={styles.infoGridCol}>
                <h4 className={styles.detailSubHeading}>Recommended Dosage</h4>
                <p className={styles.detailText}>
                  {product.dosage || "1-2 tablets twice daily, or 15-30 ml mixed with equal quantity of water, ideally consumed after meals, or as prescribed by your practitioner."}
                </p>
              </div>
              <div className={styles.infoGridCol}>
                <h4 className={styles.detailSubHeading}>Anupana (Carrier)</h4>
                <p className={styles.detailText}>
                  For best absorption, take with lukewarm water, fresh warm cow milk, or organic honey as indicated by your body constitution (Prakriti).
                </p>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <h4 className={styles.detailSubHeading}>Precautions & Safety</h4>
              <p className={styles.detailText}>
                {product.precautions || "Keep out of reach of children. Pregnant or lactating women should consult a physician before starting therapy. Store in a cool, dry place away from direct sunlight."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <h2>You May Also Like</h2>
            <p>Complementary Ayurvedic supplements for a balanced routine.</p>
          </div>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard
                key={p._id || p.name}
                product={p}
                onDetailsClick={handleProductClick}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Detailpage;

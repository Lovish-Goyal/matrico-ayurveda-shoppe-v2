import React from "react";
import useStore from "../../store/useStore";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onDetailsClick }) => {
  const { addToCart } = useStore();

  return (
    <div className={styles.productCard}>
      <div className={styles.cardBadge}>Organic</div>
      <img
        src={`/images/${product.imageSrc || product.src}`}
        alt={product.name}
        className={styles.productImage}
        onError={(e) => {
          e.target.src = "/images/default_medicine.png";
        }}
      />
      <div className={styles.productDetails}>
        <h3>{product.name}</h3>
        <div className={styles.productMeta}>
          <span className={styles.price}>{product.price}</span>
          <span className={styles.reviews}>{product.reviews || "8 reviews"}</span>
        </div>
        <p className={styles.description}>
          {product.description?.substring(0, 100)}...
        </p>
        <div className={styles.cardButtons}>
          <button
            className={styles.btnDetails}
            onClick={() => onDetailsClick(product)}
          >
            Details
          </button>
          <button
            className={styles.btnBuy}
            onClick={() => window.open(product.link, "_blank")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

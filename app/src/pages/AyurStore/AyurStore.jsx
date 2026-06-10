import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/common/ProductCard";
import styles from "./AyurStore.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function AyurStore() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleMoreDetails = (product) => {
    navigate("/detailpage", { state: { product } });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.storeContainer}>
      <header className={styles.storeHeader}>
        <h1>Ayur Store</h1>
        <div className={styles.searchWrapper}>
          <AiOutlineSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search your medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </header>

      {loading ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading the store catalog...</p>
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
          {filteredProducts.length === 0 && (
            <div className={styles.noResults}>
              <h3>No products found match that description.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AyurStore;

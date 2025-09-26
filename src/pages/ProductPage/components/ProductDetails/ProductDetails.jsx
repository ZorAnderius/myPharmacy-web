import { useState } from "react";
import styles from "./ProductDetails.module.css";
import ProductDescription from "../ProductDescription/ProductDescription";
import ProductReviews from "../ProductReviews/ProductReviews";

const ProductDetails = ({ product, reviews, isLoadingReviews }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={styles.productDetails}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "description" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <ProductDescription product={product} />
        )}

        {activeTab === "reviews" && (
          <ProductReviews reviews={reviews} isLoading={isLoadingReviews} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

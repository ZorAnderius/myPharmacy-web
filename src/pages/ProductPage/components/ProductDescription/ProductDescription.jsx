import styles from "./ProductDescription.module.css";

const ProductDescription = ({ product }) => {
  return (
    <div className={styles.description}>
      <div className={styles.disclaimer}>
        <strong>Important:</strong> Consult your healthcare provider before use if you're pregnant, nursing, or taking other medications.
      </div>

      <div className={styles.productDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Quantity:</span>
          <span className={styles.detailValue}>{product.quantity} units</span>
        </div>
      </div>

      {product.description && (
        <div className={styles.descriptionText}>
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

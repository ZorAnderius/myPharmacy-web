import { useState } from "react";
import Button from "../../../../shared/UI/Button/Button";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        {/* Основне зображення продукту */}
        {product.image_url && !imageError && (
          <img
            src={product.image_url}
            alt={product.name}
            className={`${styles.image} ${imageLoaded ? styles.loaded : styles.hidden}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Заглушка (показується якщо немає зображення або є помилка) */}
        {(!product.image_url || imageError) && (
          <img
            src="/no_product_image.avif"
            alt={`${product.name} placeholder`}
            className={`${styles.image} ${styles.placeholder}`}
          />
        )}
        {product.status && (
          <div className={styles.statusBadge}>{product.status.name}</div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productBrand}>
          {product.category?.name || "Unknown"}
        </p>
        <div className={styles.productPrice}>£{product.price}</div>
      </div>
      <div className={styles.productActions}>
        <Button className={styles.editButton} onClick={onEdit}>
          Edit
        </Button>
        <Button className={styles.deleteButton} onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

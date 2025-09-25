import Button from "../Button/Button";
import styles from "./ShopInfo.module.css";

const ShopInfo = ({ shop, onEdit }) => {
  if (!shop) return null;

  return (
    <div className={styles.shopInfoContainer}>
      <div className={styles.shopHeader}>
        <h2 className={styles.shopName}>{shop.shopName}</h2>
        <Button 
          className={styles.editButton}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      
      <div className={styles.shopDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Owner:</span>
          <span className={styles.detailValue}>{shop.ownerName}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Email:</span>
          <span className={styles.detailValue}>{shop.email}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Phone:</span>
          <span className={styles.detailValue}>{shop.phoneNumber}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Address:</span>
          <span className={styles.detailValue}>
            {shop.streetAddress}, {shop.city}, {shop.zipCode}
          </span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Delivery System:</span>
          <span className={styles.detailValue}>
            {shop.hasDeliverySystem ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;

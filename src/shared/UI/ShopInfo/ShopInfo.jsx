import Button from "../Button/Button";
import styles from "./ShopInfo.module.css";

const ShopInfo = ({ shop, onEdit, onViewProducts }) => {
  if (!shop) return null;

  return (
    <div className={styles.shopInfoContainer}>
      <div className={styles.shopHeader}>
        <h2 className={styles.shopName}>{shop.name}</h2>
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
          <span className={styles.detailValue}>{shop.phone}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Address:</span>
          <span className={styles.detailValue}>
            {shop.address ? `${shop.address.street}, ${shop.address.apartment}, ${shop.address.city}, ${shop.address.zipCode}` : 'No address'}
          </span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Delivery System:</span>
          <span className={styles.detailValue}>
            {shop.hasDelivery ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
      
      <div className={styles.buttonGroup}>
        <Button 
          className={styles.viewProductsButton}
          onClick={onViewProducts}
        >
          View products
        </Button>
        <Button 
          className={styles.editButton}
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ShopInfo;

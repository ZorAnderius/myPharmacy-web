import ShopInfo from "../../../../shared/UI/ShopInfo/ShopInfo";
import styles from "./ShopsList.module.css";

const ShopsList = ({ shops, onEditShop, onViewProducts }) => {
  if (!shops || !Array.isArray(shops) || shops.length === 0) {
    return null;
  }

  return (
    <div className={styles.shopsList}>
      {shops.map((shop, index) => (
        <ShopInfo 
          key={shop.id || index}
          shop={shop}
          onEdit={() => onEditShop(shop)}
          onViewProducts={() => onViewProducts(shop)}
        />
      ))}
    </div>
  );
};

export default ShopsList;

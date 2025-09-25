import styles from './ShopIllustration.module.css';
// Import desktop image as fallback
import desk1x from '../../../assets/img/shop/desk_1x_result.webp';

const ShopIllustration = () => {
  return (
    <div className={styles.illustrationContainer}>
      <img 
        src={desk1x} 
        alt="Shop illustration" 
        className={styles.illustrationImg}
      />
    </div>
  );
};

export default ShopIllustration;

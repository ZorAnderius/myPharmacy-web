import React from 'react';
import styles from './ShopIllustration.module.css';

// Import images for different screen sizes and densities
import desk1x from '../../../assets/img/shop/desk_1x_result.webp';
import desk2x from '../../../assets/img/shop/desk_2x_result.webp';
import tabl1x from '../../../assets/img/shop/tabl_1x_result.webp';
import tabl2x from '../../../assets/img/shop/tabl_2x_result.webp';
import mob1x from '../../../assets/img/shop/mob_1x_result.webp';
import mob2x from '../../../assets/img/shop/mob_2x_result.webp';

const ShopIllustration = () => {
  return (
    <div className={styles.illustrationContainer}>
      <picture className={styles.illustrationImage}>
        {/* Desktop images */}
        <source 
          media="(min-width: 1280px)" 
          srcSet={`${desk1x} 1x, ${desk2x} 2x`}
        />
        {/* Tablet images */}
        <source 
          media="(min-width: 768px) and (max-width: 1279px)" 
          srcSet={`${tabl1x} 1x, ${tabl2x} 2x`}
        />
        {/* Mobile images */}
        <source 
          media="(max-width: 767px)" 
          srcSet={`${mob1x} 1x, ${mob2x} 2x`}
        />
        {/* Fallback image */}
        <img 
          src={desk1x} 
          alt="Shop illustration" 
          className={styles.illustrationImg}
        />
      </picture>
    </div>
  );
};

export default ShopIllustration;

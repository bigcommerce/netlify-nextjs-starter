import Image from 'next/image';
import React, { ReactElement } from 'react';

import styles from './ProductImagesGrid.module.css';

// https://matemarschalko.medium.com/css-only-interactive-swipeable-image-carousel-3a38afe3da58

const ProductImagesGrid = ({ product }: any): ReactElement => {
  return (
    <div className={styles.root}>
      <ul className={styles.imageGrid}>
        {product?.product?.images?.edges.map((image: any, idx: any) => (
          <li className={styles.tile} key={idx}>
            <Image
              alt={image?.node?.alt || 'Product Image'}
              height={600}
              priority={idx === 0}
              quality="85"
              src={image?.node?.urlOriginal}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              width={600}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImagesGrid;

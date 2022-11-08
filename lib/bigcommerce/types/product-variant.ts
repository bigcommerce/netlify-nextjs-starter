import { Image, Measurement } from './common';

export interface ProductVariant {
  id: string;
  // The SKU (stock keeping unit) associated with the product variant.
  sku: string;
  // The product variant’s title, or the product's name.
  name: string;
  // Whether a customer needs to provide a shipping address when placing
  // an order for the product variant.
  requiresShipping: boolean;
  // The product variant’s price after all discounts are applied.
  price: number;
  // Product variant’s price, as quoted by the manufacturer/distributor.
  listPrice: number;
  // Image associated with the product variant. Falls back to the product image
  // if no image is available.
  image?: Image;
  // Indicates whether this product variant is in stock.
  isInStock?: boolean;
  // Indicates if the product variant is available for sale.
  availableForSale?: boolean;
  // The variant's weight. If a weight was not explicitly specified on the
  // variant this will be the product's weight.
  weight?: Measurement;
  // The variant's height. If a height was not explicitly specified on the
  // variant, this will be the product's height.
  height?: Measurement;
  // The variant's width. If a width was not explicitly specified on the
  // variant, this will be the product's width.
  width?: Measurement;
  // The variant's depth. If a depth was not explicitly specified on the
  // variant, this will be the product's depth.
  depth?: Measurement;
}

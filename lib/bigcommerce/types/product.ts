export interface BrandInfo {
  id?: string;
  name: string;
  slug: string;
  path?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  path: string;
}

export interface ProductImage {
  url: string;
  urlOriginal?: string;
  url_thumbnail?: string;
  url_standard?: string;
  alt?: string;
  url_so?: string;
  isDefault?: boolean;
}

export interface ProductPrice {
  value: number;
  currencyCode?: 'USD' | 'CAD' | 'EUR' | 'ARS' | string;
  retailPrice?: number;
  salePrice?: number;
  listPrice?: number;
  extendedSalePrice?: number;
  extendedListPrice?: number;
}

export interface ProductOption {
  __typename?: 'MultipleChoiceOption';
  id: string;
  displayName: string;
  values: ProductOptionValues[];
}

export interface ProductOptionValues {
  label: string;
  hexColors?: string[];
  isDefault?: boolean;
}

export type SKU = string;

export interface ProductVariant {
  id: string | number;
  sku: SKU;
  options: ProductOption[];
  availableForSale?: boolean;
  price?: ProductPrice;
  defaultImage?: ProductImage;
}

export interface Product {
  id: string;
  objectID: string;
  name: string;
  description: string;
  descriptionHtml?: string;
  warranty?: string; // STOREFRONT_AVAILABILITY_TEXT
  shipping?: string; // STOREFRONT_WARRANTY_INFO
  sku?: SKU;
  slug?: string;
  path?: string;
  brand?: BrandInfo;
  defaultImage?: { url640wide: string };
  categories?: CategoryInfo[];
  images?: ProductImage[];
  primary_image?: ProductImage;
  variant?: ProductVariant[];
  price?: ProductPrice;
  prices?: ProductPrice;
  options?: ProductOption[];
  custom_url?: { url: string; is_customized: boolean };
}

// This type is the minimal information needed to render a ProductCard,
// and allows for smaller queries, or sending less data to the FE
export const ProductForCardFields = [
  'id',
  'price',
  'path',
  'slug',
  'images',
  'name',
  'brand',
  'defaultImage',
] as const;
export type ProductForCard = Pick<Product, typeof ProductForCardFields[number]>;

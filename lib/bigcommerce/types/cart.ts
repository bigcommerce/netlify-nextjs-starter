import { ProductVariant } from './product-variant';

export interface LineItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  quantity: number;
  discounts: Discount[];
  path: string;
  variant: ProductVariant;
  options?: SelectedOption[];
}

export interface SelectedOption {
  // The option's id.
  id?: string;
  // The product option’s name.
  name: string;
  // / The product option’s value.
  value: string;
}

export interface OptionSelections {
  option_id: number;
  option_value: number | string;
}

// Shopping cart
export interface Cart {
  id: string;
  // ID of the customer to which the cart belongs.
  customerId?: string;
  // The email assigned to this cart
  email?: string;
  // The date and time when the cart was created.
  createdAt: string;
  // The currency used for this cart
  currency: { code: string };
  // Specifies if taxes are included in the line items.
  taxesIncluded: boolean;
  lineItems: LineItem[];
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes, shipping and discounts excluded.
  lineItemsSubtotalPrice: number;
  // Price of the cart before duties, shipping and taxes.
  subtotalPrice: number;
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes and discounts included.
  totalPrice: number;
  // Discounts that have been applied on the cart.
  discounts?: Discount[];
}

/**
 * Base cart item body used for cart mutations
 */
export interface CartItemBody {
  variantId: string;
  quantity?: number;
  productId: string; // The product id is always required for BC
  optionSelections?: OptionSelections;
}

// https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart#responses
export interface BigcommerceCart {
  id: string;
  parent_id?: string;
  customer_id: number;
  email: string;
  currency: { code: string };
  tax_included: boolean;
  base_amount: number;
  discount_amount: number;
  cart_amount: number;
  line_items: {
    custom_items: any[];
    digital_items: any[];
    gift_certificates: any[];
    physical_items: any[];
  };
  created_time: string;
  discounts?: Array<{ id: number; discounted_amount: number }>;
}

export interface Discount {
  // The value of the discount, can be an amount or percentage
  value: number;
}

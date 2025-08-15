export interface CartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}

export interface Cart {
  cartItems: cartItems[];
  discount?: number;
  totalPrice: number;
  totalPriceAfterDiscount?: number;
  appliedCoupons?: any[];
  _id?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface cartItems {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

export interface Product {
  rateAvg: number;
  rateCount: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  id: string;
}

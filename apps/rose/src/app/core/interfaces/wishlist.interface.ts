import { Product } from "@angular-monorepo/products";

export interface wishlistResponse {
  message: string;
  count: number;
  wishlist: Wishlist;
}

export interface Wishlist {
  user: string;
  products: Product[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Products {
  rateAvg: number;
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  id: string;
}

export interface ClearResponse {
  message: string;
  wishlist: Wishlist;
}

export interface checkResponse {
  message: string;
  inWishlist: boolean;
}

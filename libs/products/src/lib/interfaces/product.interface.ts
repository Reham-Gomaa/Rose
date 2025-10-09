import { PaginationData } from "./PaginationData.interface";

export interface ProductRes {
  message: string;
  metadata: PaginationData;
  products: Product[];
}

export interface Product {
  rateAvg?: number;
  rateCount?: number;
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  isSuperAdmin?: boolean;
  sold?: number;
  id?: string;
}

export interface updateProductData {
  price: number;
  rateAvg: number;
  rateCount: number;
}

import { PaginationData } from "./PaginationData.interface";

export interface CategoryRes {
  message: string;
  metadata: PaginationData;
  categories: Category[];
}

export interface CategoryOption {
  label: string;
  display: string;
  id: string;
};


export interface Category {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  isSuperAdmin: boolean
  productsCount: number
}

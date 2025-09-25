import { PaginationData } from "@angular-monorepo/products";

export interface CategoryRes {
  message: string;
  metadata: PaginationData;
  categories: Category[];
}

export interface CategoryOption {
  label: string;
  display: string;
  id: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

// For single category operations (add/edit/get by id)
export interface SingleCategoryRes {
  message: string;
  category: Category;
}


// For creating/updating categories
export interface CategoryRequest {
  name: string;
  image: File;
}
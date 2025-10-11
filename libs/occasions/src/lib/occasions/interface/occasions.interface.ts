import { PaginationData } from "@angular-monorepo/products";

export interface occasionRes {
  message: string;
  metadata: PaginationData;
  occasions: occasion[];
}

export interface occasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface SingleOccasionRes {
  message: string;
  occasion: occasion;
}

export interface OccasionRequest {
  name: string;
  image: File;
}

export interface DeleteOccasionRes {
  message: string;
  document: occasion;
}

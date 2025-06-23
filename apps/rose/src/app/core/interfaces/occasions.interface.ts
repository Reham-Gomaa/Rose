import { PaginationData } from "./PaginationData.interface";

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

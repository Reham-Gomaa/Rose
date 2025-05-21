export interface CategoryRes {
  message: string;
  metadata: PaginationData;
  categories: Category[];
}

export interface PaginationData {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}

export interface countBproduct {
  categoryProductCount: CategoryProductCount[];
}

export interface CategoryProductCount {
  _id: string;
  productCount: number;
  category: string;
}

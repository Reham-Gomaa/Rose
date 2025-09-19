// Interface
import { Product } from "@angular-monorepo/products";

export type sortType = "asc" | "desc";

export interface sortConditions {
  sortBy: string;
  type: sortType;
}

export interface sortState {
  products: Product[];
  sortedProducts: Product[];
  sortedConditions: sortConditions;
}

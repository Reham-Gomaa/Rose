// Interface
import { Product } from "@rose/core_interfaces/carditem.interface";

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

import { Product } from "../../core/interfaces/carditem.interface";

export type sortType = "asc" | "desc";
export type sortField = string;

export function sortProducts(products: Product[], field: sortField, order: sortType): Product[] {
  return [...products].sort((a, b) => {
    const valueA = field === "price" ? a.price : a.title.toLowerCase();
    const valueB = field === "price" ? b.price : b.title.toLowerCase();

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export interface sortConditions {
  sortBy: sortField;
  type: sortType;
}

export interface sortState {
  products: Product[];
  sortedProducts: Product[];
  sortedConditions: sortConditions;
}

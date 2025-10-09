// Interfaces
import { Product } from "@angular-monorepo/products";
import { selectedItem } from "@rose/core_interfaces/filter-item.interface";

export interface FilterState {
  products: Product[];
  filterList: Product[];
  selectedCategories: selectedItem[];
  selectedOccasions: selectedItem[];
  selectedPrice: {
    maxPrice: number;
    minPrice: number;
  };
  selectedName: string;
  selectedRating: selectedItem[];
}

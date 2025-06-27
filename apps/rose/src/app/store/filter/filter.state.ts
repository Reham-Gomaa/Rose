import { Product } from "../../core/interfaces/carditem.interface";
import { selectedItem } from "../../core/interfaces/filter-item.interface";

export interface FilterState {
  products: Product[];
  filterList: Product[];
  selectedCategories: selectedItem[];
  selectedOccasions: selectedItem[];
  selectedPrice:{
     maxPrice: number;
     minPrice: number;
  }
  selectedName:string
  selectedRating:number
}

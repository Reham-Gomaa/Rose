import { Product } from "@angular-monorepo/products";

export interface wishlistStates {
  favouriteitems: Product[];
  favouriteitemsNum: number;
  isInWishlist?: boolean; // result from checkProduct API
  message?: string;
}

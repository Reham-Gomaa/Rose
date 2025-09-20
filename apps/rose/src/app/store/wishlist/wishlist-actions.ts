import { createAction, props } from "@ngrx/store";
import { Product } from "@angular-monorepo/products";

export const toggleWishlistProduct = createAction(
  "[wishlist] toggle product in wishlist",
  props<{ product: Product }>(),
);

export const loadWishlist = createAction(
  "[wishlist] add multiple products to favourites",
  props<{ products: Product[] }>(),
);

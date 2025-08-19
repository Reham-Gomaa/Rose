// import { createAction, props } from "@ngrx/store";
// import { Product } from "@rose/core_interfaces/carditem.interface";

// export const getUserWishlist = createAction("[wishlist] load user wishlist");

// export const toggleWishlistProduct = createAction(
//   "[wishlist] toggle product in wishlist",
//   props<{ product: Product }>()
// );

// export const loadWishlist = createAction(
//   "[wishlist] add multiple products to favourites",
//   props<{ products: Product[] }>()
// );

import { createAction, props } from "@ngrx/store";
import { wishlistResponse } from "@rose/core_interfaces/wishlist.interface";

export const getUserWishlist = createAction("[wishlist] load user wishlist");

export const getUserWishlistSuccess = createAction(
  "[wishlist] get logged user wishlist success",
  props<{ wishlist: wishlistResponse }>()
);

export const getUserwishlistFailure = createAction(
  "[wishlist] get logged user wishlist failure",
  props<{ error: string }>()
);

export const addProductToWishlist = createAction(
  "[wishlist] add product to wishlist",
  props<{ p_id: string }>()
);

export const addProductToWishlistSuccess = createAction(
  "[wishlist] add product to wishlist success",
  props<{ wishlist: wishlistResponse }>()
);

export const checkInWishlist = createAction(
  "[wishlist] check if product in wishlist",
  props<{ p_id: string }>()
);

export const checkInWishlistSuccess = createAction(
  "[wishlist] check if product in wishlist success",
  props<{ isInWishlist: boolean; message: string }>()
);

export const removeSpecificItem = createAction(
  "[wishlist] delete specific wishlist item",
  props<{ p_id: string }>()
);

export const removeSpecificItemSuccess = createAction(
  "[wishlist] delete specific wishlist item success",
  props<{ wishlist: wishlistResponse }>()
);

export const clearwishlist = createAction("[wishlist] clear wishlist");

export const clearwishlistSuccess = createAction(
  "[wishlist] clear wishlist success",
  props<{ wishlist: wishlistResponse }>()
);

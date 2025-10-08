import { createReducer, on } from "@ngrx/store";
import { Product } from "@rose/core_interfaces/carditem.interface";
import {
  addProductToWishlistSuccess,
  checkInWishlistSuccess,
  clearwishlistSuccess,
  getUserWishlistSuccess,
  removeSpecificItemSuccess,
} from "./wishlist-actions";
import { wishlistStates } from "./wishlist-states";

export const initialState: wishlistStates = {
  favouriteitems: [] as Product[],
  favouriteitemsNum: 0,
  isInWishlist: false,
  message: "",
};

export const wishlistReducer = createReducer(
  initialState,

  on(getUserWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.count,
  })),

  on(addProductToWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.wishlist.products.length,
  })),

  on(checkInWishlistSuccess, (state, { isInWishlist, message }) => ({
    ...state,
    isInWishlist,
    message,
  })),

  on(removeSpecificItemSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.wishlist.products.length,
  })),

  on(clearwishlistSuccess, () => initialState),
);

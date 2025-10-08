import { createFeatureSelector, createSelector } from "@ngrx/store";
import { wishlistStates } from "./wishlist-states";
import { Product } from "@rose/core_interfaces/carditem.interface";

export const selectWishlistState = createFeatureSelector<wishlistStates>("wishlist");

export const selectWishlistItems = createSelector(
  selectWishlistState,
  (state) => state.favouriteitems,
);

export const selectWishlistCount = createSelector(
  selectWishlistState,
  (state) => state.favouriteitemsNum,
);

export const selectIsInWishlist = (productId: string) =>
  createSelector(selectWishlistItems, (items: Product[]) =>
    items.some((item) => item._id === productId),
  );

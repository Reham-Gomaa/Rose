import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartState } from "./cart-states";

export const selectCartState = createFeatureSelector<cartState>("cart");

export const selectCartItems = createSelector(
  selectCartState,
  (state: cartState) => state.cartItems
);

export const selectCartItemsNum = createSelector(
  selectCartState,
  (state: cartState) => state.cartItemsNum
);

export const selectTotalPrice = createSelector(
  selectCartState,
  (state: cartState) => state.totalPrice
);

export const selectCartLoading = createSelector(selectCartState, (state) => state.loading);

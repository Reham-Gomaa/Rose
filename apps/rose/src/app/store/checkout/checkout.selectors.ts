import { createFeatureSelector, createSelector } from "@ngrx/store";
import { checkoutState } from "./checkout.state";

export const checkoutSelector = createFeatureSelector<checkoutState>("checkout");
export const selectedShippingAdd = createSelector(
  checkoutSelector,
  (state: checkoutState) => state.shippingAddress,
);
export const selectedPayMethod = createSelector(
  checkoutSelector,
  (state: checkoutState) => state.paymentMethod,
);

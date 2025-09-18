import { createReducer, on } from "@ngrx/store";
import * as CheckoutActions from "./checkout.actions";
import { checkoutState } from "./checkout.state";

export const initialState: checkoutState = {
  shippingAddress: null,
  paymentMethod: null,
};

export const checkoutReducer = createReducer(
  initialState,
  on(CheckoutActions.selectShippingAddress, (state, { address }) => {
    return { ...state, shippingAddress: address };
  }),
  on(CheckoutActions.selectPayMethod, (state, { method }) => {
    return {
      ...state,
      paymentMethod: method,
    };
  }),
  on(CheckoutActions.createCashOrderSuccess, (state) => {
    return { ...state };
  }),
  on(CheckoutActions.checkoutSessionOpened, (state) => {
    return { ...state };
  }),
  on(CheckoutActions.checkoutFailed, (state, { failureRes }) => {
    return { ...state };
  })
);

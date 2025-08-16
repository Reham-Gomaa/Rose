import { createAction, props } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { checkoutFailureRes, Session } from "../../features/checkout/models/CheckoutRes";
import { pMethod } from "./checkout.state";






export const selectShippingAddress = createAction(
  "[checkout] select shipping address",
  props<{ address: Address }>()
)

export const selectPayMethod = createAction(
  "[checkout] select pay method",
  props<{method:pMethod}>()
)


export const createCheckoutSession = createAction(
  "[checkout] create credit order"
)
export const checkoutSessionOpened = createAction(
  "[checkout]  checkout session opened"
)
export const createCashOrder = createAction(
  "[checkout] create cash order"
)
export const createCashOrderSuccess = createAction(
  "[checkout] cash order created"
)
export const checkoutFailed = createAction(
  "[checkout]  session failed",
  props<{ failureRes: checkoutFailureRes }>()
)


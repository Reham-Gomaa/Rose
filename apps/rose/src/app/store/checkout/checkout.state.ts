import { Address } from "@rose/core_interfaces/user-address.interface";

export enum pMethod {
  CASH = "cash",
  CREDIT = "credit",
}

export interface checkoutState {
  shippingAddress:Address | null,
  paymentMethod:pMethod | null
}

import { createAction, props } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";

export const showAddresses = createAction(
  "[ADDRESS] Show Address"
);

export const showAddressesSuccess = createAction(
  "[ADDRESS] Show Address Success",
  props<{ addresses: Address[] }>()
);

export const showAddressesFailure = createAction(
  "[ADDRESS] Show Address Failure",
  props<{ error: any }>()
);
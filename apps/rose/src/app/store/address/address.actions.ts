import { createAction, props } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { AddressSituations } from "./addresses.state";




export const setAddressState = createAction(
  "[ADDRESS] Show Address",
  props<{ addressState: AddressSituations }>()
);

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





export const setDeletedAddress = createAction(
  "[ADDRESS] Set Address Id",
  props<{ addressId: string }>()
);

export const DeletedAddress = createAction(
  "[ADDRESS] Set Address Id",
   props<{ addressId: string }>()
);

export const deleteAddressesSuccess = createAction(
  "[ADDRESS] delete Address Success",
);

export const deleteAddressesFailure = createAction(
  "[ADDRESS] delete Address Failure",
  props<{ error: any }>()
);
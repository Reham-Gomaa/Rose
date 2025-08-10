import { createAction, props } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { AddressSituations } from "./addresses.state";



// Show Actions
export const setAddressState = createAction(
  "[ADDRESS] Set Show Address",
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




// Delete Actions
export const setAddressId = createAction(
  "[ADDRESS] Set Address Id ",
  props<{ addressId: string }>()
);

export const DeletedAddress = createAction(
  "[ADDRESS] Delete Address",
   props<{ addressId: string }>()
);

export const deleteAddressesSuccess = createAction(
  "[ADDRESS] delete Address Success",
  props<{ addressId: string }>()

);

export const deleteAddressesFailure = createAction(
  "[ADDRESS] delete Address Failure",
  props<{ error: any }>()
);


// Add Actions
export const AddAddress = createAction(
  "[ADDRESS] Add Address",
   props<{ address: Address }>()
);

export const AddAddressesSuccess = createAction(
  "[ADDRESS] Add Address Success",

);

export const AddAddressesFailure = createAction(
  "[ADDRESS] Add Address Failure",
  props<{ error: any }>()
);

// Add Actions
export const updateAddress = createAction(
  "[ADDRESS] update Address",
   props<{ address: Address,addressId: string }>()
);

export const updateAddressesSuccess = createAction(
  "[ADDRESS] update Address Success",

);

export const updateAddressesFailure = createAction(
  "[ADDRESS] update Address Failure",
  props<{ error: any }>()
);

// set one address
export const setAddress = createAction(
  "[ADDRESS] Set Address ",
  props<{ address: Address }>()
);
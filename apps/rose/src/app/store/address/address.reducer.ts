import { createReducer, on } from "@ngrx/store";
import { AddressSituations, AddressState } from "./addresses.state";
import { showAddresses, showAddressesFailure, showAddressesSuccess } from "./address.actions";

export const initalState: AddressState = {
  addressState: AddressSituations.showAddress,
  address: [],
  loading: false,
  error: null
};

export const addressReducer = createReducer(
    initalState,
    on(showAddresses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(showAddressesSuccess, (state, { addresses }) => ({
    ...state,
    address: addresses,
    loading: false,
    error: null
  })),
  on(showAddressesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);

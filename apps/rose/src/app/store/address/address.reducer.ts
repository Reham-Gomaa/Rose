import { createReducer, on } from "@ngrx/store";
import { AddressSituations, AddressState } from "./addresses.state";
import {
  deleteAddressesFailure,
  deleteAddressesSuccess,
  DeletedAddress,
  setAddressState,
  setDeletedAddress,
  showAddresses,
  showAddressesFailure,
  showAddressesSuccess,
} from "./address.actions";

export const initalState: AddressState = {
  addressState: AddressSituations.showAddress,
  address: [],
  loading: false,
  error: null,
  selectedAdddressId: "",
};

export const addressReducer = createReducer(
  initalState,
  on(setAddressState, (state, { addressState }) => {
    return {
      ...state,
      addressState: addressState,
    };
  }),
  on(showAddresses, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(showAddressesSuccess, (state, { addresses }) => {
    return {
      ...state,
      address: addresses,
      loading: false,
      error: null,
    };
  }),
  on(showAddressesFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
  on(setDeletedAddress, (state, { addressId }) => {
    return {
      ...state,
      selectedAdddressId: addressId,
    };
  }),
  on(DeletedAddress, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(deleteAddressesSuccess, (state, { addressId }) => {
    return {
      ...state,
      loading: false,
      addressState: AddressSituations.showAddress,
      address: state.address.filter((value) => value._id !== addressId),
    };
  }),
  on(deleteAddressesFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  })
);

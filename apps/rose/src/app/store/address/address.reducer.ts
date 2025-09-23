import { createReducer, on } from "@ngrx/store";
import { AddressSituations, AddressState } from "./addresses.state";
import {
  deleteAddressesFailure,
  deleteAddressesSuccess,
  DeletedAddress,
  setAddressState,
  showAddresses,
  showAddressesFailure,
  showAddressesSuccess,
  AddAddress,
  AddAddressesSuccess,
  AddAddressesFailure,
  setAddressId,
  setAddress,
  setUserName,
  updateAddress,
  updateAddressesSuccess,
  updateAddressesFailure,
} from "./address.actions";
import { Address } from "@rose/core_interfaces/user-address.interface";

export const initalState: AddressState = {
  addressState: AddressSituations.closeAddress,
  addresses: [],
  loading: false,
  error: null,
  selectedAdddressId: "",
  address: {} as Address,
  userName: "",
};

export const addressReducer = createReducer(
  initalState,
  // Show Address
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
      addresses: addresses,
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
  on(setAddressId, (state, { addressId }) => {
    return {
      ...state,
      selectedAdddressId: addressId,
    };
  }),

  // Delete
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
      addresses: state.addresses.filter((value) => value._id !== addressId),
    };
  }),
  on(deleteAddressesFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),

  // Add address
  on(AddAddress, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AddAddressesSuccess, (state, { addresses }) => {
    return {
      ...state,
      loading: false,
      addressState: AddressSituations.closeAddress,
      addresses: addresses,
    };
  }),
  on(AddAddressesFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),

  // update address
  on(updateAddress, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(updateAddressesSuccess, (state, { addresses }) => {
    return {
      ...state,
      loading: false,
      addressState: AddressSituations.closeAddress,
      addresses: addresses,
    };
  }),
  on(updateAddressesFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),

  // set address
  on(setAddress, (state, { address }) => {
    return {
      ...state,
      address: address,
    };
  }),
  // set user name
  on(setUserName, (state, { userName }) => {
    return {
      ...state,
      userName: userName,
    };
  }),
);

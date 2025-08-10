import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AddressState } from "./addresses.state";


export const selectAddressFeature = createFeatureSelector<AddressState>('Address');

// Individual selectors
export const selectAllAddresses = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.addresses
);

export const selectAddressLoading = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.loading
);

export const selectAddressError = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.error
);

export const selectAddressState = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.addressState
);


export const selectAddressId = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.selectedAdddressId
);

export const selectAddress = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.address
);

export const selectUserName = createSelector(
  selectAddressFeature,
  (state: AddressState) => state.userName
);
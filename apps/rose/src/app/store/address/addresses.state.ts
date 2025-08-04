import { Address } from "@rose/core_interfaces/user-address.interface";

export enum AddressSituations {
  showAddress=1,
  addAddress=2,
  addLocation=3,
  updateAddress=4,
  updateLocation=5,
}


export interface AddressState{
    addressState:AddressSituations,
    address:Address[],
    loading: boolean,
    error: any;

    
}
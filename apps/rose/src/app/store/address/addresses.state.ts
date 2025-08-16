import { Address } from "@rose/core_interfaces/user-address.interface";

export enum AddressSituations {
  closeAddress=0,
  showAddress=1,
  addAddress=2,
  addLocation=3,
  updateAddress=4,
  updateLocation=5,
  deleteAddress=6,
}


export interface AddressState{
    addressState:AddressSituations,
    addresses:Address[],
    loading: boolean,
    error: any;
    selectedAdddressId:string,
    address:Address,
    userName:string


}

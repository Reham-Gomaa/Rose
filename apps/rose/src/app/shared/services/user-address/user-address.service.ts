import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EndPoint } from "@rose/core_enums/endpoints";
import { Address, AddressAddRes, AddressRes } from "@rose/core_interfaces/user-address.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserAddressService {
  private httpClient = inject(HttpClient);

  getAllUserAddress(): Observable<AddressRes> {
    return this.httpClient.get<AddressRes>(`${EndPoint.ADDRESSES}`);
  }

  deleteAddress(addressId: string): Observable<void> {
    return this.httpClient.delete<void>(`${EndPoint.ADDRESSES}/${addressId}`);
  }

  addAddress(address: Address): Observable<AddressAddRes> {
    return this.httpClient.patch<AddressAddRes>(`${EndPoint.ADDRESSES}`, address);
  }

  updateAddress(addressId: string, address: Address): Observable<AddressRes> {
    return this.httpClient.patch<AddressRes>(`${EndPoint.ADDRESSES}/${addressId}`, address);
  }
}

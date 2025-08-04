import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EndPoint } from '@rose/core_enums/endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  private httpClient = inject(HttpClient);

  getAllUserAddress<AddressRes>(){
    return this.httpClient.get<AddressRes>(`${EndPoint.ADDRESSES}`)
    
    
  }
}

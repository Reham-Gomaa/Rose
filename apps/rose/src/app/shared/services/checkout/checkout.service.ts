import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EndPoint } from '@rose/core_enums/endpoints';
import { environment } from '@rose/core_environment/baseurl.dev';
import { Address } from '@rose/core_interfaces/user-address.interface';
import { CashRes, CreditRes } from '@rose/features_layouts/order-flow/components/checkout/models/CheckoutRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http  = inject(HttpClient)
  constructor() {
   }



  createCashOrder(orderAddress:Address):Observable<CashRes>{
    return this.http.post<CashRes>(`${EndPoint.ORDERS}`,{
     shippingAddress:{
         street: orderAddress.street,
          phone:orderAddress.phone,
          city:orderAddress.city,
          lat:orderAddress.lat,
          long:orderAddress.long,

      }
    })

  }

  createCheckoutSession(orderAddress:Address):Observable<CreditRes>{
    const url = encodeURIComponent(`${environment.runUrl}#/dashboard`)
     return this.http.post<CreditRes>(`${EndPoint.CHECKOUT_SESSION}?url=${url}`,{
      shippingAddress:{
         street: orderAddress.street,
          phone:orderAddress.phone,
          city:orderAddress.city,
          lat:orderAddress.lat,
          long:orderAddress.long,

      }
    })
  }
}

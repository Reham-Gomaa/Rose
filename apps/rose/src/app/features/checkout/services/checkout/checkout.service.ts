import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Address } from '@rose/core_interfaces/user-address.interface';
import { payInfo } from '../../checkout/paymentInfo';
import { Observable } from 'rxjs';
import { EndPoint } from '@rose/core_enums/endpoints';
import { CashRes, CreditRes } from '../../models/CheckoutRes';

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
    const url = encodeURIComponent('http://localhost:4200/#/order-flow')
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

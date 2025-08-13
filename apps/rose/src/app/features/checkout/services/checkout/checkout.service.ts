import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Address } from '@rose/core_interfaces/user-address.interface';
import { payInfo } from '../../checkout/paymentInfo';
import { Observable } from 'rxjs';
import { EndPoint } from '@rose/core_enums/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
   paymentInfo = signal<payInfo>({} as payInfo)
  shippingAddress = signal({} as Address | null);
  private http  = inject(HttpClient)
  constructor() {
   }



  createCashOrder():Observable<any>{
    const orderAddress = this.paymentInfo().shippingAddress

    return this.http.post(`${EndPoint.ORDERS}`,{
     shippingAddress:{
         street: orderAddress.street,
          phone:orderAddress.phone,
          city:orderAddress.city,
          lat:orderAddress.lat,
          long:orderAddress.long,

      }
    })

  }

  createCheckoutSession():Observable<any>{
    const url = encodeURIComponent('http://localhost:4200/#/order-flow')
    const orderAddress = this.paymentInfo().shippingAddress
     return this.http.post(`${EndPoint.CHECKOUT_SESSION}?url=${url}`,{
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

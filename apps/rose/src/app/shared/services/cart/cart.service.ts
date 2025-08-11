// @angular
import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
// rxjs
import { Observable } from "rxjs";
// shared
import { EndPoint } from "@rose/core_enums/endpoints";
import { CartResponse } from "@rose/core_interfaces/cart.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  getLoggedUserCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(`${EndPoint.CART}`);
  }

  addProductToCart(p_id: string, quantity: number): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(`${EndPoint.CART}`, {
      product: p_id,
      quantity: quantity,
    });
  }

  updateCartProductQuantity(p_id: string, quantity: number): Observable<CartResponse> {
    return this.httpClient.put<CartResponse>(`${EndPoint.CART}/${p_id}`, {
      quantity: quantity,
    });
  }

  removeSpecificCartItem(c_id: string): Observable<any> {
    return this.httpClient.delete<any>(`${EndPoint.CART}/${c_id}`);
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete<any>(`${EndPoint.CART}`);
  }
}

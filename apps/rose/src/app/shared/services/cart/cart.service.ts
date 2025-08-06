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
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  token!: string;
  headers!: HttpHeaders;

  constructor() {
    this.getToken();
  }

  getToken() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem("userToken")) {
        this.token = localStorage.getItem("userToken")!;
        this.headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        });
      }
    }
  }

  getLoggedUserCart(): Observable<CartResponse> {
    return this.httpClient.get<CartResponse>(`${EndPoint.CART}`, { headers: this.headers });
  }

  addProductToCart(p_id: string, quantity: number): Observable<CartResponse> {
    return this.httpClient.post<CartResponse>(
      `${EndPoint.CART}`,
      {
        product: p_id,
        quantity: quantity,
      },
      { headers: this.headers }
    );
  }

  updateCartProductQuantity(p_id: string, quantity: number): Observable<CartResponse> {
    return this.httpClient.put<CartResponse>(
      `${EndPoint.CART}/${p_id}`,
      {
        quantity: quantity,
      },
      { headers: this.headers }
    );
  }

  removeSpecificCartItem(c_id: string): Observable<any> {
    return this.httpClient.delete<any>(`${EndPoint.CART}/${c_id}`, { headers: this.headers });
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete<any>(`${EndPoint.CART}`, { headers: this.headers });
  }
}

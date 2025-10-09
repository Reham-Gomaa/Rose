import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EndPoint } from "@rose/core_enums/endpoints";
import {
  checkResponse,
  ClearResponse,
  wishlistResponse,
} from "@rose/core_interfaces/wishlist.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  getWishlist(): Observable<wishlistResponse> {
    return this.httpClient.get<wishlistResponse>(EndPoint.WISHLIST);
  }

  addToWishlist(p_id: string): Observable<wishlistResponse> {
    return this.httpClient.post<wishlistResponse>(EndPoint.WISHLIST, { productId: p_id });
  }

  removeFromWishlist(p_id: string): Observable<wishlistResponse> {
    return this.httpClient.delete<wishlistResponse>(EndPoint.WISHLIST + `/` + p_id);
  }

  clearWishlist(): Observable<ClearResponse> {
    return this.httpClient.delete<ClearResponse>(EndPoint.WISHLIST);
  }

  checkProductInWishlist(p_id: string): Observable<checkResponse> {
    return this.httpClient.get<checkResponse>(EndPoint.WISHLIST + `/check/` + p_id);
  }
}

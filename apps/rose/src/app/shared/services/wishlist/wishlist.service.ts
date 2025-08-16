import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EndPoint } from "@rose/core_enums/endpoints";
import { environment } from "@rose/core_environment/baseurl.prod";
import { wishlistResponse } from "@rose/core_interfaces/wishlist.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  getWishlist(): Observable<wishlistResponse> {
    return this.httpClient.get<wishlistResponse>(EndPoint.WISHLIST);
  }

  addToWishlist(p_id: string): Observable<any> {
    return this.httpClient.post<any>(environment.baseApiUrl + EndPoint.WISHLIST, {
      productId: p_id,
    });
  }

  removeFromWishlist(p_id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.baseApiUrl + EndPoint.WISHLIST + `/` + p_id);
  }

  clearWishlist(): Observable<any> {
    return this.httpClient.delete<any>(environment.baseApiUrl + EndPoint.WISHLIST);
  }

  checkProductInWishlist(p_id: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + EndPoint.WISHLIST + `/check/` + p_id);
  }
}

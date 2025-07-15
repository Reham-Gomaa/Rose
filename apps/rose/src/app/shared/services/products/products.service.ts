import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { EndPoint } from "../../../core/enums/endpoints";
import { ProductRes } from "../../../core/interfaces/carditem.interface";
import { countBproduct } from "../../../core/interfaces/count-by-product.interface";
import { reviewData, reviewsResponse } from "../../../features/pages/details/interfaces/review.interface";
import { ProductDetails } from "../../../features/pages/details/interfaces/productDetails.interface";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  getAllProducts(): Observable<ProductRes> {
    return this.httpClient.get<ProductRes>(`${EndPoint.PRODUCTS}`).pipe(shareReplay(1));
  }

  getcategoryProductCount(): Observable<countBproduct> {
    return this.httpClient.get<countBproduct>(`${EndPoint.CountPRODUCTSByCATEGORIES}`);
  }

  addProductReview(reviewInfo:reviewData,token:string):Observable<any>{
    return this.httpClient.post(`${EndPoint.ADD_REVIEW}`,reviewInfo,{
      headers:{
        "Authorization":`Bearer${token}`
      }
    })

  }
  getProductReviews(prodId:string):Observable<reviewsResponse>{
    return this.httpClient.get<reviewsResponse>(`${EndPoint.PRODUCTS}/${prodId}/reviews`)
  }

  getProductDetails(prodId:string):Observable<ProductDetails> {
     return this.httpClient.get<ProductDetails>(`${EndPoint.PRODUCTS}/${prodId}`)
  }
}

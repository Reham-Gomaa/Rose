import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { EndPoint } from "../../../core/enums/endpoints";
import { ProductRes } from "../../../core/interfaces/carditem.interface";
import { countBproduct } from "../../../core/interfaces/count-by-product.interface";
import { reviewData, reviewsResponse } from "../../../features/pages/details/interfaces/review.interface";
import { ProductDetails } from "../../../features/pages/details/interfaces/productDetails.interface";
// Interfaces
import { ProductDetailsRes } from "@rose/core_interfaces/details.interface";
// Enums


@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private httpClient = inject(HttpClient);

    getAllProducts(categoryId?: string): Observable<ProductRes> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.append('category', categoryId);
    }
    
    return this.httpClient
      .get<ProductRes>(`${EndPoint.PRODUCTS}`, { params })
      .pipe(shareReplay(1));
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
  getSpecificProduct(id: string): Observable<ProductDetailsRes> { //get specific product by id
    return this.httpClient.get<ProductDetailsRes>(`${EndPoint.PRODUCTS}/${id}`).pipe(shareReplay(1));
  }
}

import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ProductsApi } from "../base/ProductsAPI";
import { ProductRes } from "../interfaces/product.interface";
import { countBproduct } from "../interfaces/count-by-product.interface";
import { ProductDetails } from "../interfaces/productDetails.interface";
import { ProductDetailsRes } from "../interfaces/details.interface";
import { EndPoints } from "../enums/productsApi.endPoints";
import { API_BASE_URL_PRODUCTS } from "../token/api-token";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends ProductsApi {
  private readonly httpClient = inject(HttpClient);
  private readonly API_BASE = inject(API_BASE_URL_PRODUCTS);

  getAllProducts(categoryId?: string, limit = 100): Observable<ProductRes> {
    const finalUrl: string = this.API_BASE + EndPoints.PRODUCTS;
    let params = new HttpParams();
    if (categoryId) {
      params = params.append("category", categoryId);
    }

    return this.httpClient
      .get<ProductRes>(finalUrl + `?limit=${limit}`, { params })
      .pipe(shareReplay(1));
  }

  getcategoryProductCount(): Observable<countBproduct> {
    const finalUrl: string = this.API_BASE + EndPoints.CountPRODUCTSByCATEGORIES;
    return this.httpClient.get<countBproduct>(finalUrl);
  }

  getProductDetails(prodId: string): Observable<ProductDetails> {
    const finalUrl: string = this.API_BASE + EndPoints.PRODUCTS;
    return this.httpClient.get<ProductDetails>(`${finalUrl}/${prodId}`);
  }
  getSpecificProduct(id: string): Observable<ProductDetailsRes> {
    const finalUrl: string = this.API_BASE + EndPoints.PRODUCTS;
    //get specific product by id
    return this.httpClient.get<ProductDetailsRes>(`${finalUrl}/${id}`).pipe(shareReplay(1));
  }
}

import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ProductsApi } from "../base/ProductsAPI";
import { DeleteProductRes, ProductRes, updateProductData } from "../interfaces/product.interface";
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
    let params = new HttpParams();
    if (categoryId) {
      params = params.append("category", categoryId);
    }

    return this.httpClient
      .get<ProductRes>(this.getBaseUrl() + `?limit=${limit}`, { params })
      .pipe(shareReplay(1));
  }

  getcategoryProductCount(): Observable<countBproduct> {
    return this.httpClient.get<countBproduct>(this.getBaseUrl());
  }

  getProductDetails(prodId: string): Observable<ProductDetails> {
    return this.httpClient.get<ProductDetails>(`${this.getBaseUrl()}/${prodId}`);
  }
  getSpecificProduct(id: string): Observable<ProductDetailsRes> {
    return this.httpClient.get<ProductDetailsRes>(`${this.getBaseUrl()}/${id}`).pipe(shareReplay(1));
  }

  addProduct(productData: FormData): Observable<ProductDetailsRes> {
  return this.httpClient.post<ProductDetailsRes>(this.getBaseUrl(), productData);
}

updateProduct(prodId: string, productData: FormData): Observable<ProductDetailsRes> {
  return this.httpClient.put<ProductDetailsRes>(`${this.getBaseUrl()}/${prodId}`, productData);
}

deleteProduct(prodId: string): Observable<DeleteProductRes> {
  return this.httpClient.delete<DeleteProductRes>(`${this.getBaseUrl()}/${prodId}`);
}


getBaseUrl(): string {
  const finalUrl: string = this.API_BASE + EndPoints.PRODUCTS;
  return finalUrl;
}


}

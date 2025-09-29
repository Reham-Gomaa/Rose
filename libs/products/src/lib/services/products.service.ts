import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { ProductsApi } from "../base/ProductsAPI";
import { ProductRes, updateProductData } from "../interfaces/product.interface";
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
    //get specific product by id
    return this.httpClient.get<ProductDetailsRes>(`${this.getBaseUrl()}/${id}`).pipe(shareReplay(1));
  }


  addProduct(productData:FormData):Observable<ProductRes>{
    return this.httpClient.post<ProductRes>(this.getBaseUrl(),productData)
  }
  updateProduct(productNewData:updateProductData , prodId:string):Observable<any>{
    return this.httpClient.put<any>(`${this.getBaseUrl()}/${prodId}`,productNewData)
  }
  deleteProduct(prodId:string):Observable<any>{
    return this.httpClient.delete<any>(`${this.getBaseUrl()}/${prodId}`)
  }



  getBaseUrl():string{
    const finalUrl: string = this.API_BASE + EndPoints.PRODUCTS;
    return finalUrl;
  }



}

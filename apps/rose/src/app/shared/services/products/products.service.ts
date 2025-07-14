import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
// Interfaces
import { ProductRes } from "@rose/core_interfaces/carditem.interface";
import { countBproduct } from "@rose/core_interfaces/count-by-product.interface";
import { ProductDetailsRes } from "@rose/core_interfaces/details.interface";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";

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

  getSpecificProduct(id: string): Observable<ProductDetailsRes> { //get specific product by id
    return this.httpClient.get<ProductDetailsRes>(`${EndPoint.PRODUCTS}/${id}`).pipe(shareReplay(1));
  }
}

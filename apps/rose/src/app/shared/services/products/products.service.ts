import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
// Interfaces
import { ProductRes } from "@rose/core_interfaces/carditem.interface";
import { countBproduct } from "@rose/core_interfaces/count-by-product.interface";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";
import { ProductDetailsRes } from "@rose/core_interfaces/details.interface";
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

  getSpecificProduct(id: string): Observable<ProductDetailsRes> { //get specific product by id
    return this.httpClient.get<ProductDetailsRes>(`${EndPoint.PRODUCTS}/${id}`).pipe(shareReplay(1));
  }
}

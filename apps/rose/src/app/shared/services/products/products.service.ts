import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";
import { EndPoint } from "../../../core/enums/endpoints";
import { ProductRes } from "../../../core/interfaces/carditem.interface";
import { countBproduct } from "../../../core/interfaces/count-by-product.interface";

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
}

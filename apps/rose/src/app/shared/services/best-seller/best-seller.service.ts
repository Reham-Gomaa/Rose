import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// Interfaces
import { BestSellerRes } from "@rose/core_interfaces/best-seller.interface";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";

@Injectable({
  providedIn: "root",
})
export class BestSellerService {
  constructor(private httpClient: HttpClient) {}

  getBestSellers(): Observable<BestSellerRes> {
    return this.httpClient.get<BestSellerRes>(`${EndPoint.BESTSELLER}`);
  }
}

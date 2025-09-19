import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// Interfaces
import { OrderRes } from "@rose/core_interfaces/orders";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getUserOrders(): Observable<OrderRes> {
    return this.httpClient.get<OrderRes>(`${EndPoint.ORDERS}`);
  }
}

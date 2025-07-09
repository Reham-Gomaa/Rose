import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
// Interfaces
import { occasionRes } from "@rose/core_interfaces/occasions.interface";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";

@Injectable({
  providedIn: "root",
})
export class OccasionsService {
  private httpClient = inject(HttpClient);
  getcategoryOccasions(): Observable<occasionRes> {
    return this.httpClient.get<occasionRes>(`${EndPoint.OCCASION}`);
  }
}

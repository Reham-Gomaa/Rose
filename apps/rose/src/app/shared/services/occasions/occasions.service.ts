
import { Observable } from "rxjs";
import { EndPoint } from "../../../core/enums/endpoints";
import { occasionRes } from "../../../core/interfaces/occasions.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OccasionsService {
  private httpClient = inject(HttpClient);
  getcategoryOccasions(): Observable<occasionRes> {
    return this.httpClient.get<occasionRes>(`${EndPoint.OCCASION}`);
  }
}

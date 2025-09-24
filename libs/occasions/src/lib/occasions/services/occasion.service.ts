
import { inject, Injectable } from "@angular/core";
import { BASE_URL } from "../token/baseUrl.token";
import { OccasionBase } from "../base/occasion.base";
import { Observable } from "rxjs";
import { occasionRes } from "../interface/occasions.interface";
import { HttpClient } from "@angular/common/http";
import { occasionEndPoints } from "../enum/occassion.endPoints";

@Injectable({
  providedIn: "root",
})
export class OccasionService implements OccasionBase {
  private Base_Url = inject(BASE_URL);
  private _http = inject(HttpClient);

    getAllOccasions(limit = 100): Observable<occasionRes> {
    return this._http.get<occasionRes>(`${this.Base_Url+occasionEndPoints.All_OCCASION}?limit=${limit}`);
  }
}


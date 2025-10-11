import { inject, Injectable } from "@angular/core";
import { BASE_URL } from "../token/baseUrl.token";
import { OccasionBase } from "../base/occasion.base";
import { Observable, shareReplay } from "rxjs";
import {
  DeleteOccasionRes,
  OccasionRequest,
  occasionRes,
  SingleOccasionRes,
} from "../interface/occasions.interface";
import { HttpClient } from "@angular/common/http";
import { occasionEndPoints } from "../enum/occassion.endPoints";

@Injectable({
  providedIn: "root",
})
export class OccasionService implements OccasionBase {
  private Base_Url = inject(BASE_URL);
  private _http = inject(HttpClient);

  getAllOccasions(limit = 100): Observable<occasionRes> {
    return this._http.get<occasionRes>(
      `${this.Base_Url + occasionEndPoints.All_OCCASION}?limit=${limit}`,
    );
  }

  getOccasionById(occasionId: string): Observable<SingleOccasionRes> {
    const finalUrl: string = `${this.Base_Url}${occasionEndPoints.All_OCCASION}/${occasionId}`;
    return this._http.get<SingleOccasionRes>(finalUrl).pipe(shareReplay(1));
  }

  addOccasion(occasionData: FormData): Observable<SingleOccasionRes> {
    const finalUrl: string = this.Base_Url + occasionEndPoints.All_OCCASION;
    return this._http.post<SingleOccasionRes>(finalUrl, occasionData).pipe(shareReplay(1));
  }

  updateOccasion(occasionId: string, occasionData: FormData): Observable<SingleOccasionRes> {
    const finalUrl: string = `${this.Base_Url}${occasionEndPoints.All_OCCASION}/${occasionId}`;
    return this._http.put<SingleOccasionRes>(finalUrl, occasionData).pipe(shareReplay(1));
  }

  deleteOccasion(occasionId: string): Observable<DeleteOccasionRes> {
    const finalUrl: string = `${this.Base_Url}${occasionEndPoints.All_OCCASION}/${occasionId}`;
    return this._http.delete<DeleteOccasionRes>(finalUrl).pipe(shareReplay(1));
  }
}

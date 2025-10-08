import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EndPoint } from "apps/rose-dashboard/src/app/core/enums/endpoints";
import { Statistics } from "apps/rose-dashboard/src/app/core/interfaces/statistics";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private readonly httpClient = inject(HttpClient);

  getAllStatistics(): Observable<Statistics> {
    return this.httpClient.get<Statistics>(EndPoint.ALL_STATISTICS);
  }
}

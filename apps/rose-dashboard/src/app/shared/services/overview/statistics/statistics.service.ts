import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EndPoint } from "apps/rose-dashboard/src/app/core/enums/endpoints";
import { Statistics } from "apps/rose-dashboard/src/app/core/interfaces/statistics";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private readonly httpClient = inject(HttpClient);
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg4MzhkMDdhOGJjYTMwN2Y5ZDZhMzBkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTg2MTU5ODh9.hiUbPadqKjslklw0MsRB9imgl7yO26Img09nmHgcwrQ";
  authorization = { Authorization: `Bearer ${this.token}` };

  getAllStatistics(): Observable<Statistics> {
    return this.httpClient.get<Statistics>(EndPoint.STATISTICS, { headers: this.authorization });
  }
}

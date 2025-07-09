import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
// Interfaces
import { CategoryRes } from "@rose/core_interfaces/categories.interface";
// Enums
import { EndPoint } from "@rose/core_enums/endpoints";
@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private httpClient = inject(HttpClient);

  getAllCategories(): Observable<CategoryRes> {
    return this.httpClient.get<CategoryRes>(`${EndPoint.CATEGORIES}`).pipe(shareReplay(1));
  }
}

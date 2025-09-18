import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
// Interfaces
import { CategoryRes } from "../interfaces/categories.interface";
// Enums
import { EndPoints } from "../enums/categoriesAPI.endpoints"
// Token
import { API_BASE_URL_CATEGORIES } from "../token/api-token";
// Base
import { CategoriesApi } from "../base/CategoriesAPI";

@Injectable({
  providedIn: "root",
})
export class CategoriesService extends CategoriesApi {
  private httpClient = inject(HttpClient);
  private readonly API_BASE = inject(API_BASE_URL_CATEGORIES);

  getAllCategories(): Observable<CategoryRes> {
    const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient.get<CategoryRes>(finalUrl).pipe(shareReplay(1));
  }

  getCategoryById(categoryId: string): Observable<CategoryRes> {
    const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient
      .get<CategoryRes>(`${finalUrl}/${categoryId}`)
      .pipe(shareReplay(1));
  }
}

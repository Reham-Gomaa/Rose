import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
// Interfaces
import { Category, CategoryRequest, CategoryRes, DeleteCategoryRes, SingleCategoryRes } from "../interfaces/categories.interface";
// Enums
import { EndPoints } from "../enums/categoriesAPI.endpoints";
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

  getAllCategories(limit = 100): Observable<CategoryRes> {
    const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient.get<CategoryRes>(finalUrl + `?limit=${limit}`).pipe(shareReplay(1));
  }

  getCategoryById(categoryId: string): Observable<SingleCategoryRes> {
    const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient.get<SingleCategoryRes>(`${finalUrl}/${categoryId}`).pipe(shareReplay(1));
  }

addCategory(categoryData: FormData): Observable<SingleCategoryRes> {
  const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
  return this.httpClient.post<SingleCategoryRes>(finalUrl, categoryData).pipe(shareReplay(1));
}

updateCategory(categoryId: string, categoryData: FormData): Observable<SingleCategoryRes> {
  const finalUrl: string = this.API_BASE + EndPoints.CATEGORIES;
  return this.httpClient.put<SingleCategoryRes>(`${finalUrl}/${categoryId}`, categoryData).pipe(shareReplay(1));
}

 deleteCategory(categoryId: string): Observable<DeleteCategoryRes> {
    const finalUrl: string = `${this.API_BASE}${EndPoints.CATEGORIES}/${categoryId}`;
    return this.httpClient.delete<DeleteCategoryRes>(finalUrl).pipe(shareReplay(1));
  }
 
}

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
import { CategoryRequest, CategoryRes, SingleCategoryRes } from "../interfaces/categories.interface";
import { EndPoints } from "../enums/categoriesAPI.endpoints";
import { API_BASE_URL_CATEGORIES } from "../token/api-token";
import { CategoriesApi } from "../base/CategoriesAPI";

@Injectable({
  providedIn: "root",
})
export class CategoriesService extends CategoriesApi {
  private httpClient = inject(HttpClient);
  private readonly API_BASE = API_BASE_URL_CATEGORIES;  

  private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhjZDZmZDZkZDg5MzdlMDU3M2U0ODE3Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4NzA5MzU4fQ._JI38A6ThN_Oql74oPEhS7gUlBbnlmvBh1cJsnm3Qbo";

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  getAllCategories(): Observable<CategoryRes> {
    const finalUrl = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient
      .get<CategoryRes>(finalUrl, { headers: this.getAuthHeaders() })
      .pipe(shareReplay(1));
  }

  getCategoryById(categoryId: string): Observable<CategoryRes> {
    const finalUrl = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient
      .get<CategoryRes>(`${finalUrl}/${categoryId}`, { headers: this.getAuthHeaders() })
      .pipe(shareReplay(1));
  }

  addCategory(category: CategoryRequest): Observable<SingleCategoryRes> {
    const finalUrl = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient
      .post<SingleCategoryRes>(finalUrl, category, { headers: this.getAuthHeaders() })
      .pipe(shareReplay(1));
  }

  updateCategory(categoryId: string, category: CategoryRequest): Observable<SingleCategoryRes> {
    const finalUrl = this.API_BASE + EndPoints.CATEGORIES;
    return this.httpClient
      .put<SingleCategoryRes>(`${finalUrl}/${categoryId}`, category, { headers: this.getAuthHeaders() })
      .pipe(shareReplay(1));
  }
}

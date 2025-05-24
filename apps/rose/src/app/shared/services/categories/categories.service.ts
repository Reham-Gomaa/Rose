import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { EndPoint } from '../../../core/enums/endpoints';
import { CategoryRes } from '../../../core/interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private httpClient = inject(HttpClient);

  getAllCategories(): Observable<CategoryRes> {
    return this.httpClient.get<CategoryRes>(
      `${EndPoint.CATEGORIES}`
    ).pipe(shareReplay(1));
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { EndPoint } from '../../../core/enums/endpoints';
import { ProductRes } from '../../../core/interfaces/carditem.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(
      `${EndPoint.PRODUCTS}`
    ).pipe(shareReplay(1));
  }
}

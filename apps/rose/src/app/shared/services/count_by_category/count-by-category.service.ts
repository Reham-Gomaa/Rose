import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countBproduct } from '../../../core/interfaces/count-by-product.interface';

@Injectable({
  providedIn: 'root'
})
export class CountByCategoryService {

  private readonly httpClient = inject(HttpClient);

  getcategoryProductCount():Observable<countBproduct>{
    return this.httpClient.get<countBproduct>('https://flower.elevateegy.com/products/count-by-category');
  }
}

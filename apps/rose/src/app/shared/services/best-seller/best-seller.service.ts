import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BestSellerRes } from '../../../core/interfaces/best-seller';
import { EndPoint } from '../../../core/enums/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BestSellerService {

  constructor(private httpClient: HttpClient) {}

  getBestSellers(): Observable<BestSellerRes> {
    return this.httpClient.get<BestSellerRes>(`${EndPoint.BESTSELLER}`);
  }


}

import { environment } from "../environment/baseurl.prod";

export class EndPoint {
  static CATEGORIES = `${environment.baseApiUrl}api/v1/categories`;
  static PRODUCTS = `${environment.baseApiUrl}api/v1/products`;
  static CountPRODUCTSByCATEGORIES = `${environment.baseApiUrl}products/count-by-category`;
  static BESTSELLER = `${environment.baseApiUrl}api/v1/best-seller`;
}



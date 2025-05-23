import { environment } from "../environment/baseurl.prod";

export class EndPoint {
  static CATEGORIES = `${environment.baseApiUrl}/categories`;
  static PRODUCTS = `${environment.baseApiUrl}/products`;
}

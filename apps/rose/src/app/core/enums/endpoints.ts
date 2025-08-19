import { environment } from "@rose/core_environment/baseurl.prod";

export class EndPoint {
  static CATEGORIES = `${environment.baseApiUrl}api/v1/categories`;
  static PRODUCTS = `${environment.baseApiUrl}api/v1/products`;
  static CountPRODUCTSByCATEGORIES = `${environment.baseApiUrl}products/count-by-category`;
  static BESTSELLER = `${environment.baseApiUrl}api/v1/best-seller`;
  static OCCASION = `${environment.baseApiUrl}api/v1/occasions`;
  static ADD_REVIEW = `${environment.baseApiUrl}api/v1/reviews`;
  static ADDRESSES = `${environment.baseApiUrl}api/v1/addresses`;
  static ORDERS = `${environment.baseApiUrl}api/v1/orders`;
  static CHECKOUT_SESSION = `${environment.baseApiUrl}api/v1/orders/checkout`;

}

import { environment } from "apps/environment/baseurl.prod";

export class EndPoint {
  static BESTSELLER = `${environment.baseApiUrl}api/v1/best-seller`;
  static OCCASION = `${environment.baseApiUrl}api/v1/occasions`;
  static ADD_REVIEW = `${environment.baseApiUrl}api/v1/reviews`;
  static CART = `${environment.baseApiUrl}api/v1/cart`;
  static ADDRESSES = `${environment.baseApiUrl}api/v1/addresses`;
  static ORDERS = `${environment.baseApiUrl}api/v1/orders`;
  static WISHLIST = `${environment.baseApiUrl}api/v1/wishlist`;
  static ADD_TO_WISHLIST = `${environment.baseApiUrl}api/v1/wishlist/add`;
  static CLEAR_WISHLIST = `${environment.baseApiUrl}api/v1/wishlist/clear`;
  static CHECK_WISHLIST = `${environment.baseApiUrl}api/v1/wishlist/check`;
  static CHECKOUT_SESSION = `${environment.baseApiUrl}api/v1/orders/checkout`;
}

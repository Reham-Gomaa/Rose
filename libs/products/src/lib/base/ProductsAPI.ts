import { Observable } from "rxjs";
import { ProductRes } from "../interfaces/product.interface";
import { countBproduct } from "../interfaces/count-by-product.interface";
import { ProductDetails } from "../interfaces/productDetails.interface";
import { ProductDetailsRes } from "../interfaces/details.interface";

export abstract class ProductsApi {
  abstract getAllProducts(categoryId?: string): Observable<ProductRes>;
  abstract getcategoryProductCount(): Observable<countBproduct>;
  abstract getProductDetails(prodId: string): Observable<ProductDetails>;
  abstract getSpecificProduct(id: string): Observable<ProductDetailsRes>;
}

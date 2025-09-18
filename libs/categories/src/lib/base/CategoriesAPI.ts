import { Observable } from "rxjs";
import { CategoryRes} from "../interfaces/categories.interface";


export abstract class CategoriesApi {
  abstract getAllCategories(): Observable<CategoryRes>;
  abstract getCategoryById(categoryId: string): Observable<CategoryRes>;
}
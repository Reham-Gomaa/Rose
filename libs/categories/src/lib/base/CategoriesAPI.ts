import { Observable } from "rxjs";
import { CategoryRequest, CategoryRes, SingleCategoryRes } from "../interfaces/categories.interface";

export abstract class CategoriesApi {
  abstract getAllCategories(): Observable<CategoryRes>;
  abstract getCategoryById(categoryId: string): Observable<CategoryRes>;
  abstract addCategory(category: CategoryRequest): Observable<SingleCategoryRes>;
  abstract updateCategory(categoryId: string, category: CategoryRequest): Observable<SingleCategoryRes>;
}

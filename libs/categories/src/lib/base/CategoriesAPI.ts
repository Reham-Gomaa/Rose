import { Observable } from "rxjs";
import {
  CategoryRequest,
  CategoryRes,
  DeleteCategoryRes,
  SingleCategoryRes,
} from "../interfaces/categories.interface";

export abstract class CategoriesApi {
  abstract getAllCategories(): Observable<CategoryRes>;
  abstract getCategoryById(categoryId: string): Observable<SingleCategoryRes>;
  abstract addCategory(categoryData: FormData): Observable<SingleCategoryRes>;
  abstract updateCategory(
    categoryId: string,
    categoryData: FormData,
  ): Observable<SingleCategoryRes>;
  abstract deleteCategory(categoryId: string): Observable<DeleteCategoryRes>;
}

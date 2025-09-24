import { createAction, props } from "@ngrx/store";
import { sortType } from "./sort.states";
//Interfaces
import { Product } from "@angular-monorepo/products";
//load products
export const loadProducts = createAction("[sort] loadProducts", props<{ products: Product[] }>());
//sortByPrice
export const sortByPrice = createAction("[sort] sortByPrice", props<{ sType: sortType }>());
//sortByName
export const sortByTitle = createAction("[sort] sortByTitle", props<{ sType: sortType }>());
//sortProducts
export const sortProducts = createAction("[sort] sortProducts");
//clear Sort
export const clearSort = createAction("[sort] clearSort");

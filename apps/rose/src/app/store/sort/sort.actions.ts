import { createAction, props } from "@ngrx/store";
import { Product } from "../../core/interfaces/carditem.interface";
import { sortType } from "./sort.states";

//load products
export const loadProducts = createAction("[sort] loadProducts",props<{products:Product[]}>);
//setProducts
export const setProducts = createAction("[sort] setProducts", props<{products:Product[]}>());
//sortByPrice
export const sortByPrice = createAction("[sort] sortByPrice",props<{sType:sortType}>())
//sortByName
export const sortByTitle = createAction("[sort] sortByTitle",props<{sType:sortType}>())

//sortProducts
export const sortProducts = createAction("[sort] sortProducts")

//getFilteredProducts

//clear Sort
export const clearSort = createAction("[sort] clearSort");

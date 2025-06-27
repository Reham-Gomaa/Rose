import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sortState } from "./sort.states";

export const sortStateSelector = createFeatureSelector<sortState>("sort");

export const sortedProducts = createSelector(
  sortStateSelector,
  (state: sortState) => state.sortedProducts
);
export const Products = createSelector(sortStateSelector, (state: sortState) => state.products);

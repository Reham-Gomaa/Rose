import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterState } from "./filter.state";

export const selectFilterState = createFeatureSelector<FilterState>("filter");

export const selectFilterProducts = createSelector(selectFilterState, (state) => {
  if (
    state.filterList.length === 0 &&
    state.selectedCategories.length === 0 &&
    state.selectedOccasions.length === 0 &&
    state.selectedRating.length === 0 &&
    state.selectedName === ""
  ) {
    return state.products;
  } 
  return state.filterList;
});

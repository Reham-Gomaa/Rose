import { createReducer, on } from "@ngrx/store";
import { FilterState } from "./filter.state";
import {
  ApplyFilters,
  clearFilter,
  loadProductsToFilter,
  loadSelectedCategories,
  loadSelectedName,
  loadSelectedOccasions,
  loadSelectedPrice,
  loadSelectedRating,
} from "./filter.actions";

export const initalState: FilterState = {
  products: [],
  filterList: [],
  selectedCategories: [],
  selectedOccasions: [],
  selectedPrice: {
    minPrice: 0,
    maxPrice: 9999999,
  },
  selectedName: "",
  selectedRating: [],
};

export const filterReduser = createReducer(
  initalState,
  on(loadProductsToFilter, (state, { products }) => {
    return {
      ...state,
      products: products,
    };
  }),

  on(loadSelectedCategories, (state, { selectedCategories }) => {
    return {
      ...state,
      selectedCategories: selectedCategories,
    };
  }),

  on(loadSelectedOccasions, (state, { selectedOccasions }) => {
    return {
      ...state,
      selectedOccasions: selectedOccasions,
    };
  }),

  on(loadSelectedName, (state, { name }) => {
    return {
      ...state,
      selectedName: name,
    };
  }),

  on(loadSelectedPrice, (state, { minPrice, maxPrice }) => {
    return {
      ...state,
      selectedPrice: {
        minPrice,
        maxPrice,
      },
    };
  }),
  on(loadSelectedRating, (state, { selectedRating }) => {
    return {
      ...state,
      selectedRating: selectedRating,
    };
  }),

  on(ApplyFilters, (state) => {
    let filtered = state.products;

    // filter by Categories
    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedCategories.some((cat) => product.category === cat._id)
      );
    }

    // filter by Occasions
    if (state.selectedOccasions.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedOccasions.some((occ) => product.occasion === occ._id)
      );
    }

    // filter by Name
    if (state.selectedName) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(state.selectedName)
      );
    }

    // filter by rating
    if (state.selectedRating && state.selectedRating.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedRating.some((rating) => product.rateAvg === Number(rating.rateAvg))
      );
    }

    // filter by price
    filtered = filtered.filter(
      (product) =>
        Number(product.price) <= Number(state.selectedPrice.maxPrice) &&
        Number(product.price) >= Number(state.selectedPrice.minPrice)
    );
    return {
      ...state,
      filterList: filtered,
    };
  }),

  on(clearFilter, (state) => {
    return {
      ...state,
      filterList: [],
      selectedCategories: [],
      selectedOccasions: [],
      selectedPrice: {
        minPrice: 0,
        maxPrice: 9999999,
      },
      selectedName: "",
      selectedRating: [],
    };
  })
);

import { createReducer, on } from "@ngrx/store";
import { Product } from "@rose/core_interfaces/carditem.interface";
import { loadWishlist, toggleWishlistProduct } from "./wishlist-actions";
import { wishlistStates } from "./wishlist-states";

export const initialState: wishlistStates = {
  favouriteitems: [] as Product[],
  favouriteitemsNum: 0,
};

export const wishlistReducer = createReducer(
  initialState,

  on(loadWishlist, (state, { products }) => ({
    ...state,
    favouriteitems: [...products],
    favouriteitemsNum: products.length,
  })),

  // Toggle action - adds if not present, removes if present
  on(toggleWishlistProduct, (state, { product }) => {
    const productIndex = state.favouriteitems.findIndex((item) => item._id === product._id);

    if (productIndex >= 0) {
      // Product exists - remove it
      const updatedItems = [
        ...state.favouriteitems.slice(0, productIndex),
        ...state.favouriteitems.slice(productIndex + 1),
      ];

      return {
        ...state,
        favouriteitems: updatedItems,
        favouriteitemsNum: updatedItems.length,
      };
    } else {
      // Product doesn't exist - add it
      return {
        ...state,
        favouriteitems: [...state.favouriteitems, product],
        favouriteitemsNum: state.favouriteitemsNum + 1,
      };
    }
  })
);

import { createReducer, on } from "@ngrx/store";
import { Product } from "@angular-monorepo/products";
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

  on(toggleWishlistProduct, (state, { product }) => {
    const productIndex = state.favouriteitems.findIndex((item) => item._id === product._id);

    if (productIndex >= 0) {
      const updatedItems = [...state.favouriteitems.filter((item) => item._id != product._id)];

      return {
        ...state,
        favouriteitems: updatedItems,
        favouriteitemsNum: updatedItems.length,
      };
    } else {
      return {
        ...state,
        favouriteitems: [...state.favouriteitems, product],
        favouriteitemsNum: state.favouriteitemsNum + 1,
      };
    }
  }),
);

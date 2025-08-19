import { createReducer, on } from "@ngrx/store";
import { Product } from "@rose/core_interfaces/carditem.interface";
import {
  addProductToWishlistSuccess,
  checkInWishlistSuccess,
  clearwishlistSuccess,
  getUserWishlistSuccess,
  removeSpecificItemSuccess,
} from "./wishlist-actions";
import { wishlistStates } from "./wishlist-states";

export const initialState: wishlistStates = {
  favouriteitems: [] as Product[],
  favouriteitemsNum: 0,
  isInWishlist: false,
  message: "",
};

export const wishlistReducer = createReducer(
  initialState,

  on(getUserWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.count,
  })),

  on(addProductToWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.wishlist.products.length,
  })),

  on(checkInWishlistSuccess, (state, { isInWishlist, message }) => ({
    ...state,
    isInWishlist,
    message,
  })),

  on(removeSpecificItemSuccess, (state, { wishlist }) => ({
    ...state,
    favouriteitems: wishlist.wishlist.products,
    favouriteitemsNum: wishlist.wishlist.products.length,
  })),

  on(clearwishlistSuccess, () => initialState)
);

// import { createReducer, on } from "@ngrx/store";
// import { Product } from "@rose/core_interfaces/carditem.interface";
// import { loadWishlist, toggleWishlistProduct } from "./wishlist-actions";
// import { wishlistStates } from "./wishlist-states";

// export const initialState: wishlistStates = {
//   favouriteitems: [] as Product[],
//   favouriteitemsNum: 0,
// };

// export const wishlistReducer = createReducer(
//   initialState,

//   on(loadWishlist, (state, { products }) => ({
//     ...state,
//     favouriteitems: [...products],
//     favouriteitemsNum: products.length,
//   })),

//   on(toggleWishlistProduct, (state, { product }) => {
//     const productIndex = state.favouriteitems.findIndex((item) => item._id === product._id);

//     if (productIndex >= 0) {
//       const updatedItems = [
//         ...state.favouriteitems.slice(0, productIndex),
//         ...state.favouriteitems.slice(productIndex + 1),
//       ];

//       return {
//         ...state,
//         favouriteitems: updatedItems,
//         favouriteitemsNum: updatedItems.length,
//       };
//     } else {
//       return {
//         ...state,
//         favouriteitems: [...state.favouriteitems, product],
//         favouriteitemsNum: state.favouriteitemsNum + 1,
//       };
//     }
//   })
// );

import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { cartItems } from "@rose/core_interfaces/cart.interface";
import {
  addProductToCartSuccess,
  clearCart,
  clearCartSuccess,
  deleteSpecificItemSuccess,
  getUserCartSuccess,
  updateQuantitySuccess,
} from "./cart-actions";
import { cartState } from "./cart-states";

export const initialState: cartState = {
  cartItems: [] as cartItems[],
  cartItemsNum: 0,
  totalPrice: 0,
};

export const cartReducer = createReducer(
  initialState,

  on(getUserCartSuccess, (state, { cart }) => ({
    ...state,
    cartItems: cart.cart.cartItems,
    cartItemsNum: cart.numOfCartItems,
    totalPrice: cart.cart.totalPrice,
  })),

  on(addProductToCartSuccess, (state, { cart }) => ({
    ...state,
    cartItems: cart.cart.cartItems,
    cartItemsNum: cart.numOfCartItems,
    totalPrice: cart.cart.totalPrice,
  })),

  on(updateQuantitySuccess, (state, { cart }) => ({
    ...state,
    cartItems: [...cart.cart.cartItems],
    cartItemsNum: cart.numOfCartItems,
    totalPrice: cart.cart.totalPrice,
  })),

  on(deleteSpecificItemSuccess, (state, { cart }) => ({
    ...state,
    cartItems: cart.cart.cartItems,
    cartItemsNum: cart.numOfCartItems,
    totalPrice: cart.cart.totalPrice,
  })),

  on(clearCartSuccess, () => initialState)
);

import { createAction, props } from "@ngrx/store";
import { CartResponse } from "@rose/core_interfaces/cart.interface";

export const getUserCart = createAction("[Cart] get logged user cart");

export const getUserCartSuccess = createAction(
  "[Cart] get logged user cart success",
  props<{ cart: CartResponse }>()
);

export const getUserCartFailure = createAction(
  "[Cart] get logged user cart failure",
  props<{ error: string }>()
);

export const addProductToCart = createAction(
  "[Cart] add product to cart",
  props<{ p_id: string; qty: number }>()
);

export const addProductToCartSuccess = createAction(
  "[Cart] add product to cart success",
  props<{ cart: CartResponse }>()
);

export const updateQuantity = createAction(
  "[Cart] add product to cart",
  props<{ p_id: string; qty: number }>()
);

export const updateQuantitySuccess = createAction(
  "[Cart] add product to cart success",
  props<{ cart: CartResponse }>()
);

export const deleteSpecificItem = createAction(
  "[Cart] delete specific cart item",
  props<{ p_id: string }>()
);

export const deleteSpecificItemSuccess = createAction(
  "[Cart] delete specific cart item success",
  props<{ cart: CartResponse }>()
);

export const clearCart = createAction("[Cart] clear cart");

export const clearCartSuccess = createAction(
  "[Cart] clear cart success",
  props<{ cart: CartResponse }>()
);

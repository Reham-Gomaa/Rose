import { cartItems } from "@rose/core_interfaces/cart.interface";

export interface cartState {
  cartItems: cartItems[];
  cartItemsNum: number;
  totalPrice: number;
  loading: boolean;
}

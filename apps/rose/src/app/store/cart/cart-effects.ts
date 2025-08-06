import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CartService } from "@rose/shared_services/cart/cart.service";
import { catchError, map, of, switchMap } from "rxjs";
import {
  addProductToCart,
  addProductToCartSuccess,
  clearCart,
  deleteSpecificItem,
  deleteSpecificItemSuccess,
  getUserCart,
  getUserCartFailure,
  getUserCartSuccess,
  updateQuantity,
  updateQuantitySuccess,
} from "./cart-actions";

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);
  private readonly store = inject(Store);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserCart),
      switchMap(() =>
        this.cartService.getLoggedUserCart().pipe(
          map((cart) => getUserCartSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToCart),
      switchMap((action) =>
        this.cartService.addProductToCart(action.p_id, action.qty).pipe(
          map((cart) => addProductToCartSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message })))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateQuantity),
      switchMap((action) =>
        this.cartService.updateCartProductQuantity(action.p_id, action.qty).pipe(
          map((cart) => updateQuantitySuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSpecificItem),
      switchMap((action) =>
        this.cartService.removeSpecificCartItem(action.c_id).pipe(
          map((cart) => deleteSpecificItemSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message })))
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearCart),
      switchMap(() =>
        this.cartService.clearUserCart().pipe(
          map(() => clearCart()),
          catchError((error) => of(getUserCartFailure({ error: error.message })))
        )
      )
    )
  );
}

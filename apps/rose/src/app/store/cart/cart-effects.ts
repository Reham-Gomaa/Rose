import { Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { CartService } from "@rose/shared_services/cart/cart.service";
import { MessageService } from "primeng/api";
import { catchError, map, of, switchMap, tap } from "rxjs";
import {
  addProductToCart,
  addProductToCartSuccess,
  clearCart,
  clearCartSuccess,
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
  private readonly _messageService = inject(MessageService);
  private readonly _translate = inject(TranslateService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserCart),
      switchMap(() =>
        this.cartService.getLoggedUserCart().pipe(
          map((cart) => getUserCartSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  loadCartFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserCartFailure),
        tap(() => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.somethingWentWrong"),
          });
        }),
      ),
    { dispatch: false },
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToCart),
      switchMap((action) =>
        this.cartService.addProductToCart(action.p_id, action.qty).pipe(
          map((cart) => addProductToCartSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  addProductSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addProductToCartSuccess),
        tap(({ cart }) => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.addToCartSuccess"),
          });
        }),
      ),
    { dispatch: false },
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateQuantity),
      switchMap((action) =>
        this.cartService.updateCartProductQuantity(action.p_id, action.qty).pipe(
          map((cart) => updateQuantitySuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updateProductSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateQuantitySuccess),
        tap(({ cart }) => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.cartUpdatedSuccessfully"),
          });
        }),
      ),
    { dispatch: false },
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSpecificItem),
      switchMap((action) =>
        this.cartService.removeSpecificCartItem(action.p_id).pipe(
          map((cart) => deleteSpecificItemSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteProductSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteSpecificItemSuccess),
        tap(({ cart }) => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.pdtremovedsuccessfully"),
          });
        }),
      ),
    { dispatch: false },
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearCart),
      switchMap(() =>
        this.cartService.clearUserCart().pipe(
          map((cart) => clearCartSuccess({ cart })),
          catchError((error) => of(getUserCartFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  clearCartSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearCartSuccess),
        tap(({ cart }) => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.cartEmpty"),
          });
        }),
      ),
    { dispatch: false },
  );
}

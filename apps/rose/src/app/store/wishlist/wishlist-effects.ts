import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { WishlistService } from "@rose/shared_services/wishlist/wishlist.service";
import { MessageService } from "primeng/api";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import {
  addProductToWishlist,
  addProductToWishlistSuccess,
  checkInWishlist,
  checkInWishlistSuccess,
  clearWishlist,
  clearwishlistSuccess,
  getUserWishlist,
  getUserwishlistFailure,
  getUserWishlistSuccess,
  removeSpecificItem,
  removeSpecificItemSuccess,
} from "./wishlist-actions";

@Injectable()
export class WishlistEffects {
  private readonly actions$ = inject(Actions);
  private readonly wishlistService = inject(WishlistService);
  private readonly _messageService = inject(MessageService);
  private readonly _translate = inject(TranslateService);

  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserWishlist),
      switchMap(() =>
        this.wishlistService.getWishlist().pipe(
          map((wishlist) => getUserWishlistSuccess({ wishlist })),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  // getErrorMessage$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getUserwishlistFailure),
  //       tap(() => {
  //         this._messageService.add({
  //           severity: "error",
  //           detail: this._translate.instant("messagesToast.somethingWentWrong"),
  //         });
  //       }),
  //     ),
  //   { dispatch: false },
  // );

  addProductToWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToWishlist),
      mergeMap(({ p_id }) =>
        this.wishlistService.addToWishlist(p_id).pipe(
          switchMap(() => [getUserWishlist()]),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  checkProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkInWishlist),
      switchMap((action) =>
        this.wishlistService.checkProductInWishlist(action.p_id).pipe(
          map((res) =>
            checkInWishlistSuccess({ isInWishlist: res.inWishlist, message: res.message }),
          ),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeSpecificItem),
      switchMap((action) =>
        this.wishlistService.removeFromWishlist(action.p_id).pipe(
          map((wishlist) => removeSpecificItemSuccess({ wishlist })),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  removalSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeSpecificItemSuccess),
        tap(() => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.removeFromWishlistSuccess"),
          });
        }),
      ),
    { dispatch: false },
  );

  clearWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearWishlist),
      switchMap(() =>
        this.wishlistService.clearWishlist().pipe(
          map((wishlist) => clearwishlistSuccess({ wishlist })),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  clearCartSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(clearwishlistSuccess),
        tap(() => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.wishlistEmpty"),
          });
        }),
      ),
    { dispatch: false },
  );
}

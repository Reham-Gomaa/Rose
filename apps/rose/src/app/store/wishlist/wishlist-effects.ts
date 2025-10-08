import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { WishlistService } from "@rose/shared_services/wishlist/wishlist.service";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import {
  addProductToWishlist,
  addProductToWishlistSuccess,
  checkInWishlist,
  checkInWishlistSuccess,
  clearwishlist,
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
  private readonly store = inject(Store);

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

  clearWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearwishlist),
      switchMap(() =>
        this.wishlistService.clearWishlist().pipe(
          map((wishlist) => clearwishlistSuccess({ wishlist })),
          catchError((error) => of(getUserwishlistFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}

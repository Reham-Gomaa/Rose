import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import {
  ApplyFilters,
  loadProductsToFilter,
  loadSelectedCategories,
  loadSelectedOccasions,
  loadSelectedPrice,
  loadSelectedName,
  loadSelectedRating,
} from "./filter.actions";

export class FilterEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);

  readonly autoApplyFilters$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          loadProductsToFilter,
          loadSelectedCategories,
          loadSelectedOccasions,
          loadSelectedPrice,
          loadSelectedName,
          loadSelectedRating
        ),
        tap(() => {
          this._store.dispatch(ApplyFilters());
        })
      ),
    { dispatch: false }
  );
}

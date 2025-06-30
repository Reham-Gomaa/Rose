import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ApplyFilters, loadProductsToFilter, loadSelectedCategories, loadSelectedOccasions, loadSelectedPrice, loadSelectedName, loadSelectedRating } from "./filter.actions";
import { tap } from "rxjs/operators";

export class FilterEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);

  readonly autoApplyFilters$ = createEffect(() =>
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


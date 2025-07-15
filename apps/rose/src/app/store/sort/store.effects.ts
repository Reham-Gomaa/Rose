import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import * as sortActions from "./sort.actions";

export class sortEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);

  readonly sortByPriceAndTitleEffects$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(sortActions.sortByPrice, sortActions.sortByTitle),
        tap(() => {
          this._store.dispatch(sortActions.sortProducts());
        })
      ),
    {
      dispatch: false,
    }
  );
}

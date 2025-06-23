import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ProductsService } from "../../shared/services/products/products.service";
import * as sortActions from './sort.actions';
import { map, switchMap, tap } from "rxjs";

export class sortEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);
  private readonly _productsService = inject(ProductsService);

  readonly loadProductsEffect$ = createEffect(()=>
  this._actions$.pipe(
    ofType(sortActions.loadProducts),
    tap((action)=>

    console.log(action))
  ),
  { dispatch: false }
  )
  readonly sortByPriceAndTitleEffects$ = createEffect(()=>
  this._actions$.pipe(
    ofType(sortActions.sortByPrice , sortActions.sortByTitle),
    tap(()=>{
      this._store.dispatch(sortActions.sortProducts())
    })
  ),
  {
    dispatch: false
  }
  )

}

import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { CheckoutService } from "../../shared/services/checkout/checkout.service";
import * as checkoutActions from "./checkout.actions";
import * as checkoutSelectors from "./checkout.selectors";
import { Router } from "@angular/router";
import {
  CashRes,
  CreditRes,
} from "@rose/features_layouts/order-flow/components/checkout/models/CheckoutRes";

export class checkoutEffects {
  private action$ = inject(Actions);
  private router = inject(Router);
  private _store = inject(Store);
  private _checkoutService = inject(CheckoutService);

  readonly cashOrderEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(checkoutActions.createCashOrder),
      withLatestFrom(this._store.select(checkoutSelectors.selectedShippingAdd)),
      switchMap(([_, checkoutInfo]) => {
        return this._checkoutService.createCashOrder(checkoutInfo!).pipe(
          map((res: CashRes) => {
            if (res.message == "success") {
              this.router.navigate(["/order-flow"]);
            }
            return checkoutActions.createCashOrderSuccess();
          }),
          catchError((error) => of(checkoutActions.checkoutFailed({ failureRes: error }))),
        );
      }),
    ),
  );
  readonly creditOrderEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(checkoutActions.createCheckoutSession),
      withLatestFrom(this._store.select(checkoutSelectors.selectedShippingAdd)),
      switchMap(([_, checkoutInfo]) => {
        return this._checkoutService.createCheckoutSession(checkoutInfo!).pipe(
          map((res: CreditRes) => {
            if (res.message == "success") {
              window.open(res.session.url, "_self");
            }
            return checkoutActions.checkoutSessionOpened();
          }),
          catchError((error) => of(checkoutActions.checkoutFailed({ failureRes: error }))),
        );
      }),
    ),
  );
}

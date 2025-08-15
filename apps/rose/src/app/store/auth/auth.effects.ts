import { inject, Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { tap } from "rxjs";
import * as AuthActions from "./auth.actions";
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly _storageManager = inject(StorageManagerService);

  readonly tokentEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this._storageManager.setItem("token", action.token);
        })
      ),
    { dispatch: false }
  );
}

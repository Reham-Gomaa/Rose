import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, createReducer, Store } from "@ngrx/store";
import {
  deleteAddressesFailure,
  deleteAddressesSuccess,
  DeletedAddress,
  showAddresses,
  showAddressesFailure,
  showAddressesSuccess,
} from "./address.actions";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { UserAddressService } from "@rose/shared_services/user-address/user-address.service";
import { AddressRes } from "@rose/core_interfaces/user-address.interface";

export class AddressEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _userAddressService = inject(UserAddressService);

  readonly getAllAddresses$ = createEffect(
    (): Observable<Action> =>
      this._actions$.pipe(
        ofType(showAddresses),
        switchMap(() => {
          return this._userAddressService.getAllUserAddress().pipe(
            map((addressRes: AddressRes) => {
              return showAddressesSuccess({ addresses: addressRes.addresses });
            }),
            catchError((error) => {
              return of(showAddressesFailure({ error }));
            })
          );
        })
      )
  );

  readonly deleteAddress$ = createEffect(
    (): Observable<Action> =>
      this._actions$.pipe(
        ofType(DeletedAddress),
        switchMap(({ addressId }) => {
          return this._userAddressService.deleteAddress(addressId).pipe(
            map(() => {
              return deleteAddressesSuccess();
            }),
            catchError((error) => of(deleteAddressesFailure({ error })))
          );
        })
      )
  );
}

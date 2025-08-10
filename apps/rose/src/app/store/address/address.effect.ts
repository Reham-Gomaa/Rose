import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, createReducer, Store } from "@ngrx/store";
import {
  AddAddress,
  AddAddressesFailure,
  AddAddressesSuccess,
  deleteAddressesFailure,
  deleteAddressesSuccess,
  DeletedAddress,
  showAddresses,
  showAddressesFailure,
  showAddressesSuccess,
  updateAddress,
  updateAddressesFailure,
  updateAddressesSuccess,
} from "./address.actions";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { UserAddressService } from "@rose/shared_services/user-address/user-address.service";
import { AddressRes } from "@rose/core_interfaces/user-address.interface";

export class AddressEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _userAddressService = inject(UserAddressService);

  //Show Effect
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
 
  // Delete Effect
  readonly deleteAddress$ = createEffect(
    (): Observable<Action> =>
      this._actions$.pipe(
        ofType(DeletedAddress),
        switchMap(({ addressId }) => {
          return this._userAddressService.deleteAddress(addressId).pipe(
            map(() => {
              return deleteAddressesSuccess({addressId:addressId});
            }),
            catchError((error) => of(deleteAddressesFailure({ error })))
          );
        })
      )
  );

  // Add Effect
  readonly addAddress$ = createEffect(
    (): Observable<Action> =>
      this._actions$.pipe(
        ofType(AddAddress),
        tap(()=>console.log("add effect")),
        switchMap(({ address }) => {
          return this._userAddressService.addAddress(address).pipe(
            map(() => {
              return AddAddressesSuccess();
            }),
            catchError((error) => of(AddAddressesFailure({ error })))
          );
        })
      )
  );


  // update Effect
  readonly updateAddress$ = createEffect(
    (): Observable<Action> =>
      this._actions$.pipe(
        ofType(updateAddress),
        switchMap(({ address,addressId }) => {
          return this._userAddressService.updateAddress(addressId,address).pipe(
            map(() => {
              return updateAddressesSuccess();
            }),
            catchError((error) => of(updateAddressesFailure({ error })))
          );
        })
      )
  );
}

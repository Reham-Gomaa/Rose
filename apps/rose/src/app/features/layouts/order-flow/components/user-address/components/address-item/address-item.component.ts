import { Component, inject, input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";
import {
  setAddress,
  setAddressId,
  setAddressState,
} from "apps/rose/src/app/store/address/address.actions";

@Component({
  selector: "app-address-item",
  imports: [],
  templateUrl: "./address-item.component.html",
  styleUrl: "./address-item.component.scss",
})
export class AddressItemComponent {
  private readonly _store = inject(Store);
  address = input.required<Address>();

  openDeleteDialog() {
    this._store.dispatch(setAddressId({ addressId: this.address()._id }));
    this._store.dispatch(setAddressState({ addressState: 6 }));
  }

  openUpdateDialog() {
    this._store.dispatch(setAddress({ address: this.address() }));
    this._store.dispatch(setAddressId({ addressId: this.address()._id }));
    this._store.dispatch(setAddressState({ addressState: 4 }));
  }
}

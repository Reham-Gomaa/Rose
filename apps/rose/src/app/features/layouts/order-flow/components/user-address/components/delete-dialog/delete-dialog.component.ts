import { Component, EventEmitter, inject, input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import {
  DeletedAddress,
  setAddressState,
  showAddresses,
} from "apps/rose/src/app/store/address/address.actions";
import {
  selectAddressError,
  selectAddressId,
  selectAddressLoading,
} from "apps/rose/src/app/store/address/address.selector";

@Component({
  selector: "app-delete-dialog",
  imports: [CustomMainDialogComponent],
  templateUrl: "./delete-dialog.component.html",
  styleUrl: "./delete-dialog.component.scss",
})
export class DeleteDialogComponent implements OnInit {
  private readonly _store = inject(Store);
  @Output() closed = new EventEmitter<void>();
  addressId = input.required<string>();
  visible = input.required<boolean>();
  loading!: boolean;
  error!: any;

  loading$ = this._store.select(selectAddressLoading);
  error$ = this._store.select(selectAddressError);

  ngOnInit(): void {
    this.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.error$.subscribe((error) => {
      this.error = error;
    });
  }

  close() {
    this.closed.emit();
  }

  deleteAddress() {
    this._store.dispatch(DeletedAddress({ addressId: this.addressId() }));
    this._store.dispatch(setAddressState({ addressState: 1 }));
  }
}

import { Component, EventEmitter, inject, input, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import { TranslatePipe } from "@ngx-translate/core";
import {
  DeletedAddress,
} from "apps/rose/src/app/store/address/address.actions";
import {
  selectAddressError,
  selectAddressId,
  selectAddressLoading,
} from "apps/rose/src/app/store/address/address.selector";
import { SpinnerComponent } from "@rose/shared_Components_ui/spinner/spinner.component";

@Component({
  selector: "app-delete-dialog",
  imports: [CustomMainDialogComponent, SpinnerComponent,TranslatePipe],
  templateUrl: "./delete-dialog.component.html",
  styleUrl: "./delete-dialog.component.scss",
})
export class DeleteDialogComponent implements OnInit {
  private readonly _store = inject(Store);
  @Output() closed = new EventEmitter<void>();
  addressId!: string;
  visible = input.required<boolean>();
  loading!: boolean;
  error!: any;

  loading$ = this._store.select(selectAddressLoading);
  error$ = this._store.select(selectAddressError);
  addressId$ = this._store.select(selectAddressId);

  ngOnInit(): void {
    this.initSelectors()
  }

  close() {
    this.closed.emit();
  }

  deleteAddress() {
    this._store.dispatch(DeletedAddress({ addressId: this.addressId }));
      
  }

  initSelectors():void{
  this.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.error$.subscribe((error) => {
      this.error = error;
    });
    this.addressId$.subscribe((addressId) => {
      this.addressId = addressId;
    });
  }
}

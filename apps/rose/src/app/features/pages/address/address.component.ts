import { Component, DestroyRef, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { AddressSituations } from "../../../store/address/addresses.state";
import { TranslatePipe } from "@ngx-translate/core";
import {
  selectAddressError,
  selectAddressLoading,
  selectAddressState,
  selectAllAddresses,
} from "../../../store/address/address.selector";
import { setAddressState, showAddresses } from "../../../store/address/address.actions";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AddressItemComponent } from "@rose/features_layouts/order-flow/components/user-address/components/address-item/address-item.component";
import { SpinnerComponent } from "@rose/shared_Components_ui/spinner/spinner.component";
import { DeleteDialogComponent } from "@rose/features_layouts/order-flow/components/user-address/components/delete-dialog/delete-dialog.component";
import { AddressStepperComponent } from "@rose/features_layouts/order-flow/components/user-address/components/address-stepper/address-stepper.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";

@Component({
  selector: "app-address",
  imports: [AddressItemComponent, SpinnerComponent, TranslatePipe, DeleteDialogComponent, AddressStepperComponent, ButtonComponent],
  templateUrl: "./address.component.html",
  styleUrl: "./address.component.scss",
})
export class AddressComponent {
  private readonly _store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  public AddressSituations = AddressSituations;
  address!: Array<Address>;
  loading!: boolean;
  error!: any;
  addressState!: AddressSituations;
  myAddress!: Address;

  addresses$ = this._store.select(selectAllAddresses);
  loading$ = this._store.select(selectAddressLoading);
  error$ = this._store.select(selectAddressError);
  addressState$ = this._store.select(selectAddressState);

  ngOnInit(): void {
    this.loadAddresses();
    this.initSelectors();
  }
  
  openAddDialog(){
    this._store.dispatch(setAddressState({ addressState: 2 }));
  }

  closeDeleteDialog(){
    this._store.dispatch(setAddressState({addressState:0}))
  }

  closeStepperDialog(){
    this._store.dispatch(setAddressState({addressState:0}))
  }
   
  
  loadAddresses() {
    this._store.dispatch(showAddresses());
  }

  initSelectors() {
    this.addresses$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((addresses) => {
      this.address = addresses;
    });
    this.loading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((loading) => {
      this.loading = loading;
    });
    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((error) => {
      this.error = error;
    });
    this.addressState$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((addressState) => {
      this.addressState = addressState;
    });
  }
}

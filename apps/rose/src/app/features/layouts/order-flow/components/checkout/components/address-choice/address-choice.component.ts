import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import * as addressActions from "@rose/address/address.actions";
import * as addressSelectors from "@rose/address/address.selector";
import { AddressSituations } from "@rose/address/addresses.state";
import * as checkoutActions from "@rose/checkout/checkout.actions";
import * as checkoutSelectors from "@rose/checkout/checkout.selectors";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { ButtonModule } from "primeng/button";
import { UserAddressComponent } from "@rose/features_layouts/order-flow/components/user-address/user-address.component";

@Component({
  selector: "app-address-choice",
  imports: [ButtonModule, ButtonComponent, UserAddressComponent],
  templateUrl: "./address-choice.component.html",
  styleUrl: "./address-choice.component.scss",
})
export class AddressChoiceComponent {
  private readonly store = inject(Store);
  userAddresses = signal<Address[]>([]);
  selectedAddress!: Address | null;
  addsLoading = false;
  addressState!: AddressSituations;

  ngOnInit() {
    this.initSelectors();
  }

  initSelectors() {
    this.store.dispatch(addressActions.showAddresses());
    this.store.select(addressSelectors.selectAllAddresses).subscribe({
      next: (addresses) => {
        this.userAddresses.set(addresses);
        this.addsLoading = true;
      },
    });

    this.store.select(checkoutSelectors.selectedShippingAdd).subscribe({
      next: (address) => {
        this.selectedAddress = address;
      },
    });

    this.store.select(addressSelectors.selectAddressState).subscribe((addressState) => {
      this.addressState = addressState;
    });
  }

  setShipAddress(addressId: string) {
    const add: Address = this.userAddresses().find((add) => {
      return add._id === addressId;
    })!;
    this.store.dispatch(
      checkoutActions.selectShippingAddress({
        address: add,
      }),
    );
  }

  close() {
    this.store.dispatch(addressActions.setAddressState({ addressState: 0 }));
  }

  openAddress() {
    this.store.dispatch(addressActions.setAddressState({ addressState: 1 }));
    this.store.dispatch(addressActions.showAddresses());
  }
}

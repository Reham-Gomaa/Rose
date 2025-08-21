import { AsyncPipe, CommonModule, JsonPipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import * as addActions from "@rose/address/address.actions";
import * as addSelectors from "@rose/address/address.selector";
import * as checkoutActions from "@rose/checkout/checkout.actions";
import * as checkoutSelectors from "@rose/checkout/checkout.selectors";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-address-choice",
  imports: [CommonModule, ButtonModule, ButtonComponent],
  templateUrl: "./address-choice.component.html",
  styleUrl: "./address-choice.component.scss",
})
export class AddressChoiceComponent {


  private store = inject(Store)
  userAddresses= signal<Address[]>([])
  selectedAddress!:Address|null
  addsLoading = false;

  ngOnInit(){
    this.store.dispatch(addActions.showAddresses())
    this.store.select(addSelectors.selectAllAddresses).subscribe({
      next: (addresses) => {
        this.userAddresses.set(addresses)
        this.addsLoading = true
      }
    })

    this.store.select(checkoutSelectors.selectedShippingAdd).subscribe({
      next: (address) => {
        this.selectedAddress = address
      }
    })

  }

  setShipAddress(addressId:string){
    console.log("add");
    const add:Address = this.userAddresses().find((add)=>{
      return add._id === addressId
    })!
   this.store.dispatch(checkoutActions.selectShippingAddress({
    address: add
   }))


  }



}

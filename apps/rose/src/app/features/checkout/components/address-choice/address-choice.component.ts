import { Component, computed, inject, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { Store } from "@ngrx/store";
import * as addSelectors from "@rose/address/address.selector";
import * as addActions from "@rose/address/address.actions";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { Skeleton } from 'primeng/skeleton';
import { CheckoutService } from "../../services/checkout/checkout.service";

@Component({
  selector: "app-address-choice",
  imports: [CommonModule, ButtonModule, ButtonComponent,Skeleton],
  templateUrl: "./address-choice.component.html",
  styleUrl: "./address-choice.component.scss",
})
export class AddressChoiceComponent {


  private store = inject(Store)
  private checkout = inject(CheckoutService)
  userAddresses= signal<Address[]>([])
  selectedAddress = computed(()=>this.checkout.shippingAddress())
  addsLoading = false;

  ngOnInit(){
    this.store.dispatch(addActions.showAddresses())
    this.store.select(addSelectors.selectAllAddresses).subscribe({
      next: (addresses) => {
        this.userAddresses.set(addresses)
        this.addsLoading = true
      }
    })

  }

  setShipAddress(addressId:string){
    const add:Address = this.userAddresses().find((add)=>{
      return add._id === addressId
    })!
    this.checkout.paymentInfo.update((info)=>{
      return {...info, shippingAddress: add}
    })
    
    this.checkout.shippingAddress.set(add)

    
  }

  getUserAddresses(){

  }


}

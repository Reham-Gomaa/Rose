import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// shared-components
import { UserAddressComponent } from "@rose/features_layouts/order-flow/components/user-address/user-address.component";
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { Store } from "@ngrx/store";
import { selectAddress, selectAddressState } from "../../../store/address/address.selector";
import { AddressSituations } from "../../../store/address/addresses.state";
import { setAddressState, showAddresses } from "../../../store/address/address.actions";
import { AboutUsComponent } from "../home/components/about-us/aboutUs.component";
import { TestimonialsComponent } from "../home/components/testimonials/testimonials.component";
import { ExpertTeamComponent } from "./components/expert-team/expert-team.component";
import { OurServicesComponent } from "../home/components/our-services/ourServices.component";
import { TrustedByComponent } from "../home/components/trusted-by/trustedBy.component";
@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
  imports: [
    ButtonModule,
    StepperModule,
    ReactiveFormsModule,
    UserAddressComponent,
    AboutUsComponent,
    TestimonialsComponent,
    ExpertTeamComponent,
    OurServicesComponent,
    TrustedByComponent
],
})
export class AboutComponent implements OnInit {
  visible: boolean = false;
  private readonly _store = inject(Store);
  myAddress!: Address;
  addressState!: AddressSituations;
  close() {
    this._store.dispatch(setAddressState({addressState:0}))
  }

  ngOnInit(): void {
    this._store.select(selectAddressState).subscribe((addressState) => {
      this.addressState=addressState
      console.log(this.addressState);
    });
    this._store.select(selectAddress).subscribe((address) => {
      this.myAddress = address;
            console.log(address);

    });
  }

  openAddress(){
    this.visible = true;
    this._store.dispatch(setAddressState({addressState:1}))
    this._store.dispatch(showAddresses())
  }
}

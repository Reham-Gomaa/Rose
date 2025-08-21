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
    AboutUsComponent,
    TestimonialsComponent,
    ExpertTeamComponent,
    OurServicesComponent,
    TrustedByComponent,
],
})
export class AboutComponent {

}

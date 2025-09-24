import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// shared-components
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
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
export class AboutComponent {}

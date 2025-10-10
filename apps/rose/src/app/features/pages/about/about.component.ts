import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// shared-components
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { AboutUsComponent } from "../home/components/about-us/aboutUs.component";
import { OurServicesComponent } from "../home/components/our-services/ourServices.component";
import { TestimonialsComponent } from "../home/components/testimonials/testimonials.component";
import { TrustedByComponent } from "../home/components/trusted-by/trustedBy.component";
import { ExpertTeamComponent } from "./components/expert-team/expert-team.component";
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

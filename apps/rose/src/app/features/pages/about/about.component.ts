import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// shared-components
import { StepDefinition, StepperComponent } from "@rose/shared_Components_ui/stepper/stepper.component";
import { ContactComponent } from "../contact/contact.component";
import { UserAddressComponent } from "@rose/features_layouts/order-flow/components/user-address/user-address.component";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
  imports: [ReactiveFormsModule, StepperComponent, UserAddressComponent, CustomMainDialogComponent],
})
export class AboutComponent {
 steps: StepDefinition[] = [
  { label: 'Header I', component: AboutComponent, value: 1 },
  { label: 'Header II', component: ContactComponent, value: 2 },
  { label: 'Header III', component: AboutComponent, value: 3 }
];
 visible: boolean=false

 close(){
  this.visible=false;
 }



}

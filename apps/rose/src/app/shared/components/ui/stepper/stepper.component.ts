import { Component, Input, Type } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { ContactComponent } from "@rose/features_pages/contact/contact.component";


export interface StepDefinition {
  label: string;
  component: Type<any>;
  value: number;
}

@Component({
  selector: "app-stepper",
  imports: [ButtonModule, StepperModule, ContactComponent],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  @Input() steps: StepDefinition[] = [];

}

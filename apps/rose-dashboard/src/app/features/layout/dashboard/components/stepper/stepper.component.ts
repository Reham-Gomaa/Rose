import { Component } from "@angular/core";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";
import { BreadcrumpComponent } from "./components/breadcrump/breadcrump.component";

@Component({
  selector: "app-stepper",
  imports: [TranslatePipe, BreadcrumpComponent],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  hidden: boolean = false;

  changeHidden() {
    this.hidden = !this.hidden;
  }
}

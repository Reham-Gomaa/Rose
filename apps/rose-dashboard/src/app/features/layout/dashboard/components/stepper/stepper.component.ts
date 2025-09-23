import { Component} from "@angular/core";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";
// RxJS
import { BreadcrumpComponent } from "./components/breadcrump/breadcrump.component";
// Router
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-stepper",
  imports: [TranslatePipe, BreadcrumpComponent,RouterLink],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {

  hidden: boolean = false;





  

  changeHidden() {
    this.hidden = !this.hidden;
  }

}
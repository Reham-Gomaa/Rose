import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
// Components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

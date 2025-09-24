import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// Components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterOutlet],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

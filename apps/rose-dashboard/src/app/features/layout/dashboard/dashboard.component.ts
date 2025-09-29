import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// Components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { BottomNavbarComponent } from "./components/bottom-navbar/bottom-navbar.component";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterOutlet, BottomNavbarComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

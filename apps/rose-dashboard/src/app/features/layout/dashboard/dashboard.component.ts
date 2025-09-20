import { Component } from "@angular/core";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { ContentComponent } from "./components/content/content.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

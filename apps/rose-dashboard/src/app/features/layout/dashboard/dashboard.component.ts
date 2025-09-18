import { Component } from "@angular/core";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { ContentComponent } from "./components/content/content.component";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, ContentComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

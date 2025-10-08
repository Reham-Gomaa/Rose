import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// Components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { BottomNavbarComponent } from "./components/bottom-navbar/bottom-navbar.component";
import { TranslationService } from "@angular-monorepo/services";
import { fadeTransition } from "@angular-monorepo/services";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterOutlet, BottomNavbarComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  animations: [fadeTransition],
})
export class DashboardComponent {
  protected readonly _translationService = inject(TranslationService);
}

import { Component } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Components
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
// Sheared Components
import { SpeedDialComponent } from "@rose/shared_Components_business/speedDial-btn/speedDial.component";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SpeedDialComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

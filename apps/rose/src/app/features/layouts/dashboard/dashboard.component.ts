import { Component } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Components
import { SpeedDialComponent } from "@rose/shared_Components_business/speedDial-btn/speedDial.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SpeedDialComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

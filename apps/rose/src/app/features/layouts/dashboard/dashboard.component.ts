import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Components
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { SpeedDialComponent } from "@rose/shared_Components_business/speedDial-btn/speedDial.component";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SpeedDialComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

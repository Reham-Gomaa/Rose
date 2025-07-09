import { Component } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Components
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}

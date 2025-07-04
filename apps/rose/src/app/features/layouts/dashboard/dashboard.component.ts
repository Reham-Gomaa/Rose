import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  
})
export class DashboardComponent {}

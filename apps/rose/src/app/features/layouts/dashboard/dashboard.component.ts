import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FooterComponent } from "./features/pages/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet , NavbarComponent , FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

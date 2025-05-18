import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../pages/footer/footer.component";
import { NavbarComponent } from '../../pages/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

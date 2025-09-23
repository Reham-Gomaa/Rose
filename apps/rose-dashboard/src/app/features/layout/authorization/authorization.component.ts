import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-authorization",
  imports: [NgOptimizedImage],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent {
  goToLogin(): void {
    window.location.href = "https://rose-chi-nine.vercel.app/#/login";
  }
}

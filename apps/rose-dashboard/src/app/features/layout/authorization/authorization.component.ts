import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { environment } from "@rose/environment/baseurl.prod";
@Component({
  selector: "app-authorization",
  imports: [NgOptimizedImage],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent {
  goToLogin(): void {
    window.location.href = environment.runUrl;
  }
}

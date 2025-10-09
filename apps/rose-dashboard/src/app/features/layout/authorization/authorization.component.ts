import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Environment
import { environment } from "@rose/environment/baseurl.dev";

@Component({
  selector: "app-authorization",
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
})
export class AuthorizationComponent {
  goToLogin(): void {
    window.location.href = environment.runUrl;
  }
}

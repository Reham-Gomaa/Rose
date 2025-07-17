// @angular
import { Component, inject } from "@angular/core";

// shared-components
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";

@Component({
  selector: "app-login",
  imports: [AuthComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  animations: [fadeTransition]
})
export class LoginComponent {
  readonly translationService = inject(TranslationService)
}

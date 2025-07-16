import { Component, inject } from "@angular/core";
import { AuthComponent } from "./../../auth.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [AuthComponent, FormButtonComponent, TranslatePipe, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  animations: [fadeTransition]
})
export class LoginComponent {
  readonly translationService = inject(TranslationService)
}

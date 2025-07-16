import { Component, inject } from "@angular/core";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { AuthComponent } from "../../auth.component";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { RouterLink } from "@angular/router";
import { fadeTransition } from "@rose/core_services/translation/fade.animation";

@Component({
  selector: "app-register",
  imports: [ AuthComponent, FormButtonComponent, TranslatePipe, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  animations: [fadeTransition]
})
export class RegisterComponent {
  readonly translationService = inject(TranslationService)
}

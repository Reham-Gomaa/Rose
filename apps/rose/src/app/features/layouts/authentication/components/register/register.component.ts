// @angular
import { Component, inject } from "@angular/core";

// shared-components
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { AuthComponent } from "../../auth.component";

@Component({
  selector: "app-register",
  imports: [ AuthComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  animations: [fadeTransition]
})
export class RegisterComponent {
  readonly translationService = inject(TranslationService)
}

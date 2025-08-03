// @angular
import { Component, inject } from "@angular/core";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// shared-comp
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";

@Component({
  selector: "app-cart",
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
  animations: [fadeTransition],
})
export class CartComponent {
  readonly translationService = inject(TranslationService);
}

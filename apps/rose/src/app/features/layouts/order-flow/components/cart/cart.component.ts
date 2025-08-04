// @angular
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// shared-services
import { TranslationService } from "@rose/core_services/translation/translation.service";
// shared-comp
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";

@Component({
  selector: "app-cart",
  imports: [RouterLink, ButtonComponent, TranslatePipe, ReactiveFormsModule, CustomInputComponent],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
  animations: [fadeTransition],
})
export class CartComponent {
  readonly translationService = inject(TranslationService);

  empty: boolean = false;

  // quantityForm :FormGroup = new FormGroup({
  //   quantity : new FormControl(0)
  // })
}

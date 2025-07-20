// @angular
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

// @ngx
import { TranslatePipe } from "@ngx-translate/core";

// shared-components
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";

// shared-service
import { TranslationService } from "@rose/core_services/translation/translation.service";

// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";

@Component({
  selector: "app-login",
  imports: [
    RouterLink,
    AuthComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    FormButtonComponent,
    TranslatePipe,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  animations: [fadeTransition],
})
export class LoginComponent {
  readonly translationService = inject(TranslationService);

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  submit() {
    console.log(this.loginForm.value);
    console.log(this.loginForm);
    console.log(this.loginForm.get("email"));
  }
}

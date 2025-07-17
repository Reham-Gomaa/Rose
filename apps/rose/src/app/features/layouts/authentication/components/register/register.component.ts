// @angular
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

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
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";

@Component({
  selector: "app-register",
  imports: [AuthComponent, CustomInputComponent, ReactiveFormsModule, FormButtonComponent, TranslatePipe, CustomInputPhoneComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  animations: [fadeTransition]
})
export class RegisterComponent {
  readonly translationService = inject(TranslationService);

  registerForm :FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ["",[Validators.required]],
      lastName: ["",[Validators.required]],
      email: ["", [Validators.required]],
      password: ["",[Validators.required]],
      rePassword: ["",[Validators.required]],
      phone: ["",[Validators.required]],
      gender: ["",[Validators.required]],
    });
  }

  submit(){
     console.log(this.registerForm.value);
      console.log(this.registerForm)
      console.log(this.registerForm.get('name'))
  }
}

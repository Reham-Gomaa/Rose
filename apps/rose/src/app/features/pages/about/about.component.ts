import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// shared-components
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
  imports: [CustomInputComponent, CustomInputPhoneComponent, ReactiveFormsModule],
})
export class AboutComponent {
  aboutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.aboutForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required,]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$"
          )
        ]
      ],
    });
  }

  onSubmit() {
      console.log(this.aboutForm.value);
      console.log(this.aboutForm)
      console.log(this.aboutForm.get('name'))

  }
}

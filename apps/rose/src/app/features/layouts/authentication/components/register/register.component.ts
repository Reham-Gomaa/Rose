import { Component, DestroyRef, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Components
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";
// shared-components
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
// animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// primeNG
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { Select } from "primeng/select";
// Auth lib
import { AuthApiKpService } from "auth-api-kp";

@Component({
  selector: "app-register",
  imports: [
    AuthComponent,
    CustomInputComponent,
    CustomInputPhoneComponent,
    FormButtonComponent,
    ReactiveFormsModule,
    TranslatePipe,
    ToastModule,
    Select,
  ],

  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [fadeTransition],
})
export class RegisterComponent {
  readonly translationService = inject(TranslationService);
  private translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);

  genders = [
    { value: "male", label: this.translate.instant("auth.register.gender.male") },
    { value: "female", label: this.translate.instant("auth.register.gender.female") },
  ];

  registerForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(\+201|01)[0125][0-9]{8}$/),
      ]),
      gender: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        ),
      ]),
      rePassword: new FormControl("", [Validators.required]),
    },
    { validators: this.confirmPassword.bind(this) }
  );

  confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get("password")?.value;
    const rePassword = control.get("rePassword")?.value;
    return password === rePassword ? null : { misMatch: true };
  }

  registerSubmit(): void {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      this._messageService.add({
        severity: "warn",
        detail: "Please fill all required fields correctly.",
        life: 3000,
      });
      return;
    }

    this.isLoading.set(true);
    this.apiError.set("");

    this._authApiKpService
      .register(this.registerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ("token" in res && res.message === "success") {
            this._messageService.add({
              severity: "success",
              detail: "Registration successful!",
              life: 3000,
            });

            setTimeout(() => {
              this._router.navigate(["/login"]);
            }, 500);
          } else {
            this._messageService.add({
              severity: "error",
              detail: "Registration failed.",
              life: 3000,
            });
          }
        },
        error: (err) => {
          this.apiError.set(
            err.error?.message || "Registration failed. Please check your details and try again."
          );
          this._messageService.add({
            severity: "error",
            detail: err.error?.message || "Something went wrong!",
            life: 3000,
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  private markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}

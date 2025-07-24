import { Component, EventEmitter, inject, Output, signal, DestroyRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// shared-components
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
// PrimeNG
import { MessageService } from "primeng/api";
// Auth Lib
import { AuthApiKpService } from "auth-api-kp";

@Component({
  selector: "app-forget-password",
  standalone: true,
  imports: [CustomInputComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./forget-password.component.html",
  styleUrl: "./forget-password.component.scss",
})
export class ForgetPasswordComponent {
  readonly translationService = inject(TranslationService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  @Output() emailSubmitted = new EventEmitter<string>();

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isEmailPopoverVisible = signal<boolean>(false);

  forgetPassForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  forgetpasswordSubmit(): void {
    if (this.forgetPassForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set("");
    const email = this.forgetPassForm.get("email")?.value ?? "";

    this._authApiKpService
      .forgetPassword(this.forgetPassForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res && res?.message === "success") {
            this.emailSubmitted.emit(email);
            this._messageService.add({
              severity: "success",
              detail: "OTP sent to your email Please check your inbox.",
              life: 3000,
            });
          } else {
            this._messageService.add({
              severity: "error",
              detail: "Failed to send verification code. Please try again.",
              life: 3000,
            });
          }
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: "An error occurred. Please try again.",
            life: 3000,
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}

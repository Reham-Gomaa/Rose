import { Component, EventEmitter, inject, Output, signal, DestroyRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/services";
// shared-components
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
import { FormButtonComponent } from "@angular-monorepo/rose-buttons";
// PrimeNG
import { MessageService } from "primeng/api";
// Auth Lib
import { AuthApiKpService } from "auth-api-kp";

@Component({
  selector: "app-forget-password",
  imports: [CustomInputComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./forget-password.component.html",
  styleUrl: "./forget-password.component.scss",
})
export class ForgetPasswordComponent {
  readonly translationService = inject(TranslationService);
  private readonly _translate = inject(TranslateService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
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
          if ("error" in res) {
            this._messageService.add({
              severity: "error",
              detail: this._translate.instant("messagesToast.failedSendCode"),
              life: 3000,
            });
          } else {
            if (res.message === "success") {
              this.emailSubmitted.emit(email);
              this._messageService.add({
                severity: "success",
                detail: this._translate.instant("messagesToast.otpSent"),
                life: 3000,
              });
            } else {
              this._messageService.add({
                severity: "error",
                detail: this._translate.instant("messagesToast.verificationFailed"),
                life: 3000,
              });
            }
          }
        },
        error: () => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.unexpectedError"),
            life: 3000,
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}

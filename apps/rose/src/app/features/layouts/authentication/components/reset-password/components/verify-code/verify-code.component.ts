import { Component, DestroyRef, EventEmitter, inject, Input, Output, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { interval } from "rxjs";
// Translation
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
// shared-components
import { FormButtonComponent } from "@angular-monorepo/rose-buttons";
// PrimeNG
import { MessageService } from "primeng/api";
import { InputOtpModule } from "primeng/inputotp";
// Auth lib
import { AuthApiKpService } from "auth-api-kp";
@Component({
  selector: "app-verify-code",
  imports: [ReactiveFormsModule, FormButtonComponent, TranslatePipe, InputOtpModule],
  templateUrl: "./verify-code.component.html",
  styleUrl: "./verify-code.component.scss",
})
export class VerifyCodeComponent {
  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  @Input() email: string = "";
  @Output() codeVerified = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  // Signals
  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isResending = signal<boolean>(false);
  resendSuccess = signal<boolean>(false);
  cooldownSeconds = signal<number>(0);

  // Form

  verifyCodeForm: FormGroup = new FormGroup({
    otpCode: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  ngOnInit() {
    if (!this.email) this._router.navigate(["/forget-pass"]);
    this.startCooldownTimer();
  }

  private startCooldownTimer(): void {
    this.cooldownSeconds.set(30);
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.cooldownSeconds() > 0) {
          this.cooldownSeconds.update((v) => v - 1);
        }
      });
  }

  resendVerificationCode(): void {
    if (this.cooldownSeconds() > 0 || this.isResending()) return;

    this.isResending.set(true);
    this.apiError.set("");

    this._authApiKpService
      .forgetPassword({ email: this.email })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ("error" in res) {
            this.apiError.set(
              res.error || this._translate.instant("messagesToast.failedResendCode"),
            );
            this._messageService.add({
              severity: "error",
              detail: res.error || this._translate.instant("messagesToast.failedResendCode"),
              life: 3000,
            });
          } else {
            if (res.message === "success") {
              this.resendSuccess.set(true);
              this.startCooldownTimer();
              this._messageService.add({
                severity: "success",
                detail: this._translate.instant("messagesToast.otpSent"),
                life: 3000,
              });
            } else {
              this.apiError.set(this._translate.instant("messagesToast.failedResendCode"));
              this._messageService.add({
                severity: "error",
                detail: res.message || this._translate.instant("messagesToast.failedResendCode"),
                life: 3000,
              });
            }
          }
        },
        error: () => {
          this.apiError.set(this._translate.instant("messagesToast.unexpectedError"));
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.unexpectedError"),
            life: 3000,
          });
        },
        complete: () => {
          this.isResending.set(false);
        },
      });
  }

  verifyCodeSubmit(): void {
    if (this.verifyCodeForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set("");

    const resetCode = this.verifyCodeForm.get("otpCode")?.value;
    const data = { email: this.email, resetCode };

    this._authApiKpService
      .verifyCode(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ("error" in res) {
            this._messageService.add({
              severity: "error",
              detail: res.error || this._translate.instant("messagesToast.verificationFailed"),
              life: 3000,
            });
            this.apiError.set(
              res.error || this._translate.instant("messagesToast.verificationFailed"),
            );
          } else {
            if (res.status === "Success") {
              this.codeVerified.emit();
              this._messageService.add({
                severity: "success",
                detail: this._translate.instant("messagesToast.codeVerified"),
                life: 3000,
              });
            } else {
              this._messageService.add({
                severity: "error",
                detail: this._translate.instant("messagesToast.invalidVerificationCode"),
                life: 3000,
              });
              this.apiError.set(this._translate.instant("messagesToast.invalidVerificationCode"));
            }
          }
        },
        error: () => {
          this.apiError.set(this._translate.instant("messagesToast.unexpectedError"));
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

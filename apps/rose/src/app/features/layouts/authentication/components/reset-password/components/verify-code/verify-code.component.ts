import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
  DestroyRef,
  computed,
  effect,
} from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { interval, Subject, takeUntil } from "rxjs";
import { AuthApiKpService } from "auth-api-kp";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { TranslatePipe } from "@ngx-translate/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MessageService } from "primeng/api";
import { InputOtpModule } from "primeng/inputotp";

@Component({
  selector: "app-verify-code",
  standalone: true,
  imports: [ReactiveFormsModule, FormButtonComponent, TranslatePipe, InputOtpModule],
  templateUrl: "./verify-code.component.html",
  styleUrls: ["./verify-code.component.scss"],
})
export class VerifyCodeComponent {
  private readonly fb = inject(FormBuilder);
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
          if (res?.message === "success") {
            this.resendSuccess.set(true);
            this.startCooldownTimer();
            this._messageService.add({
              severity: "success",
              detail: "A new OTP code has been sent to your email.",
              life: 3000,
            });
          } else {
            this.apiError.set("Failed to resend verification code.");
          }
        },
        error: (err) => {
          this.apiError.set(err?.error?.message || "Error resending code.");
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
          if (res?.status === "Success") {
            this.codeVerified.emit();
            this._messageService.add({
              severity: "success",
              detail: "Code verified successfully!",
              life: 3000,
            });
          } else {
            this.apiError.set("Invalid verification code.");
          }
        },
        error: (err) => {
          this.apiError.set(err?.error?.message || "Verification failed.");
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}

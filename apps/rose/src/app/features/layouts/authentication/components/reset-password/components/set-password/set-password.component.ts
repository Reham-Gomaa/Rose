import { Component, EventEmitter, Input, Output, inject, signal, DestroyRef } from "@angular/core";
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
// shared-components
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
// PrimeNG
import { MessageService } from "primeng/api";
// Auth lib
import { AuthApiKpService } from "auth-api-kp";
@Component({
  selector: "app-set-password",
  imports: [ReactiveFormsModule, FormButtonComponent, CustomInputComponent, TranslatePipe],
  templateUrl: "./set-password.component.html",
  styleUrls: ["./set-password.component.scss"],
})
export class SetPasswordComponent {
  private readonly _translate = inject(TranslateService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly _router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  @Input() email: string = "";
  @Output() passwordReset = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  strengthLevel = signal<number>(0);

  resetPasswordForm = new FormGroup(
    {
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        ),
      ]),
      confirmPassword: new FormControl("", Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );

  ngOnInit(): void {
    if (!this.email) {
      this._router.navigate(["/forget-pass"]);
    }
  }

  resetPasswordSubmit(): void {
    if (this.resetPasswordForm.invalid || this.isLoading()) return;

    const newPassword = this.resetPasswordForm.get("password")?.value;
    if (!newPassword) {
      this.apiError.set("Password is required.");
      return;
    }

    this.isLoading.set(true);
    this.apiError.set("");

    this._authApiKpService
      .resetPassword({
        email: this.email,
        newPassword,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.resetPasswordSuccess"),
            life: 3000,
          });
          this.passwordReset.emit();
          this._router.navigate(["/login"]);
        },
        error: (err) => {
          this.apiError.set(
            err.error?.message || this._translate.instant("messagesToast.resetPasswordFailed")
          );
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.resetPasswordFailed"),
            life: 3000,
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onPasswordInput(): void {
    const password = this.resetPasswordForm.get("password")?.value;
    this.checkPasswordStrength(password || "");
  }

  checkPasswordStrength(password: string): void {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    this.strengthLevel.set(strength);
  }
}

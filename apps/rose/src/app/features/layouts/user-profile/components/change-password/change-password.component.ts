import { Component, DestroyRef, inject, signal } from "@angular/core";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthApiKpService } from "auth-api-kp";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TranslatePipe } from "@ngx-translate/core";
import { PlatformService } from "@rose/core_services/platform/platform.service";

@Component({
  selector: "app-change-password",
  imports: [CustomInputComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly _router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _platformService = inject(PlatformService);

  // Signals
  isLoading = signal(false);
  isSaving = signal(false);

  changePasswordForm = new FormGroup(
    {
      password: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        ),
      ]),
      newPassword: new FormControl<string>("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        ),
      ]),
      rePassword: new FormControl<string>("", Validators.required),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get("newPassword")?.value;
    const rePassword = control.get("rePassword")?.value;
    return newPassword === rePassword ? null : { misMatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const payload = {
      password: this.changePasswordForm.value.password ?? "",
      newPassword: this.changePasswordForm.value.newPassword ?? "",
    };

    this.isSaving.set(true);

    this._authApiKpService
      .changePassword(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ("message" in res) {
            if (
              this._platformService.checkPlatform() === "Browser" &&
              "token" in res &&
              res.token
            ) {
              localStorage.setItem("authToken", res.token);
              this._messageService.add({
                severity: "success",
                summary: "Success",
                detail: res.message || "Password changed successfully",
              });
            }
          }
          this._router.navigate(["/dashboard/home"]);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            summary: "Error",
            detail: err?.error?.message || "Failed to change password",
          });
        },
        complete: () => {
          this.isSaving.set(false);
        },
      });
  }
}

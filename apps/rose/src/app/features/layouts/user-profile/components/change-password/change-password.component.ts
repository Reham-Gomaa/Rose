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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";

@Component({
  selector: "app-change-password",
  imports: [CustomInputComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  private readonly _translate = inject(TranslateService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly storage = inject(StorageManagerService);

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
            if ("token" in res && res.token) {
              this.storage.setItem("authToken", res.token);
            }
            this._messageService.add({
              severity: "success",
              detail: this._translate.instant("messagesToast.passwordChangeSuccess"),
            });
          } else {
            this._messageService.add({
              severity: "error",
              detail: this._translate.instant("messagesToast.passwordChangeFailed"),
            });
          }
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.passwordChangeFailed"),
          });
        },
        complete: () => {
          this.isSaving.set(false);
        },
      });
  }
}

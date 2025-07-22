import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { AuthApiKpService } from "auth-api-kp";
import { Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-forget-pass",
  imports: [CustomInputComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./forget-pass.component.html",
  styleUrl: "./forget-pass.component.scss",
  animations: [fadeTransition],
})
export class ForgetPassComponent {
  readonly translationService = inject(TranslationService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly fb = inject(FormBuilder);

  @Output() emailSubmitted = new EventEmitter<string>();

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isEmailPopoverVisible = signal<boolean>(false);

  private forgetSub!: Subscription;

  forgetPassForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  });

  forgetpasswordSubmit(): void {
    if (this.forgetPassForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set("");
    const email = this.forgetPassForm.get("email")?.value ?? "";

    this.forgetSub = this._authApiKpService.forgetPassword(this.forgetPassForm.value).subscribe({
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

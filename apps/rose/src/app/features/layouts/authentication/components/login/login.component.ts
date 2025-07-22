// @angular
import { Component, inject, OnDestroy, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

// @ngx
import { TranslatePipe } from "@ngx-translate/core";

// shared-components
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";

// shared-service
import { TranslationService } from "@rose/core_services/translation/translation.service";

// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { AuthApiKpService } from "auth-api-kp";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  imports: [
    RouterLink,
    AuthComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    FormButtonComponent,
    TranslatePipe,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeTransition],
})
export class LoginComponent implements OnDestroy {
  readonly translationService = inject(TranslationService);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  public _messageService = inject(MessageService);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);

  private loginSub?: Subscription;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
    ]),
  });

  LoginSubmit(): void {
    if (this.loginForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.apiError.set("");

    this.loginSub = this._authApiKpService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if ("token" in res && res.message === "success") {
          localStorage.setItem("authToken", res.token);
          this._messageService.add({
            severity: "success",
            detail: "Login successful!",
            life: 3000,
          });

          setTimeout(() => {
            this._router.navigate(["/dashboard/home"]);
          }, 2000);
        } else {
          this._messageService.add({
            severity: "error",
            detail: "Incorrect Email or Password. Please try again",
            life: 5000,
          });
        }
      },
      error: (err) => {
        this._messageService.add({
          severity: "error",
          detail: "Incorrect Email or Password. Please try again",
          life: 5000,
        });
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}

import { Component, inject, signal, DestroyRef } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
// shared-components
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
// services
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";
import { UserStateService } from "@rose/core_services/user-state/user-state.service";
// shared-service
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// PrimeNG
import { MessageService } from "primeng/api";
// Auth lib
import { AuthApiKpService } from "auth-api-kp";
// Store
import { Store } from "@ngrx/store";
import * as AuthActions from "@rose/store_auth/auth.actions";

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
  styleUrl: "./login.component.scss",
  animations: [fadeTransition],
})
export class LoginComponent {
  readonly translationService = inject(TranslationService);
  private readonly _translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  public _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  private readonly _store = inject(Store);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);

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

    this._authApiKpService
      .login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if ("token" in res && res.message === "success") {
            this._store.dispatch(AuthActions.loginSuccess({ token: res.token }));
            this._storageManagerService.setItem("authToken", res.token);
            this._userStateService.setLoggedIn(true);

            this._messageService.add({
              severity: "success",
              detail: this._translate.instant("messagesToast.loginSuccess"),
              life: 3000,
            });
            this._router.navigate(["/dashboard/home"]);
          } else {
            this._messageService.add({
              severity: "error",
              detail: this._translate.instant("messagesToast.loginFailed"),
              life: 5000,
            });
          }
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.loginFailed"),
            life: 5000,
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}

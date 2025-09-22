import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/translation";
// Animation_Translation
import { fadeTransition } from "@rose/core_services/fade-out-animation/fade.animation";
// Services
import { StorageManagerService } from "@angular-monorepo/services";
import { UserStateService } from "@angular-monorepo/services";
// Components

// PrimeNG
import { MessageService } from "primeng/api";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
// Auth_Lib
import { AuthApiKpService } from "auth-api-kp";
import { User } from "auth-api-kp";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ConfirmDialogComponent } from "@angular-monorepo/confirm-dialog";
import { FormButtonComponent } from "@angular-monorepo/rose-form-button";

@Component({
  selector: "app-user-profile",
  imports: [
    SkeletonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    TranslateModule,
    EditProfileComponent,
    ChangePasswordComponent,
    ConfirmDialogComponent,
    FormButtonComponent,
  ],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss",
  animations: [fadeTransition],
})
export class UserProfileComponent {
  readonly _translationService = inject(TranslationService);
  private _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  private location = inject(Location);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isLoggedIn = signal<boolean>(false);
  user = signal<User | null>(null);
  isSaving = signal<boolean>(false);

  activeTab: "profile" | "password" = "profile";

  @ViewChild(EditProfileComponent)
  editProfileComponent?: EditProfileComponent;

  @ViewChild(ChangePasswordComponent)
  changePasswordComponent?: ChangePasswordComponent;

  switchTab() {
    this.activeTab = this.activeTab === "password" ? "profile" : "password";
  }

  saveChanges() {
    if (this.activeTab === "profile") {
      this.editProfileComponent?.onSubmit();
    } else {
      this.changePasswordComponent?.onSubmit();
    }
  }

  get currentFormInvalid(): boolean {
    if (this.activeTab === "profile") {
      return this.editProfileComponent?.formGroup.invalid ?? true;
    }
    return this.changePasswordComponent?.formGroup.invalid ?? true;
  }

  get currentLoading(): boolean {
    if (this.activeTab === "profile") {
      return this.editProfileComponent?.loading ?? false;
    }
    return this.changePasswordComponent?.loading ?? false;
  }

  submitButtonText(): string {
    return this.activeTab === "password"
      ? this._translate.instant("user-Profile.updateProfile")
      : this._translate.instant("user-Profile.changePassword");
  }

  logout() {
    this._authApiKpService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this._storageManagerService.removeItem("authToken");
          this._userStateService.setLoggedIn(false);
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.logoutSuccess"),
            life: 3000,
          });

          this.user.set(null);
          this.location.go("https://rose-chi-nine.vercel.app/#/login");

          setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 0);
        },
        error: (err) => {
          this._storageManagerService.removeItem("authToken");
          this._userStateService.setLoggedIn(false);
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.sessionExpired"),
            life: 3000,
          });
        },
      });
  }

  onDeleteAccountConfirmed(confirmed: boolean): void {
    if (!confirmed) return;
    this._authApiKpService
      .deleteMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._storageManagerService.removeItem("authToken");
          this._userStateService.setLoggedIn(false);
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.accountDeletedSuccessfully"),
            life: 3000,
          });
          this.user.set(null);
          this._router.navigate(["/dashboard/home"]);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToDeleteAccount"),
          });
        },
      });
  }
}

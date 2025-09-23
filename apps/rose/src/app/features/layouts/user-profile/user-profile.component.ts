import { Component, DestroyRef, inject, signal } from "@angular/core";
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
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
// PrimeNG
import { MessageService } from "primeng/api";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
// Auth_Lib
import { AuthApiKpService } from "auth-api-kp";
import { User } from "auth-api-kp";

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

  activeTab: "profile" | "password" = "profile";

  switchTab(tab: "profile" | "password") {
    this.activeTab = tab;
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
}

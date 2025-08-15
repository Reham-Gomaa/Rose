import { Component, DestroyRef, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animation_Translation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Services
import { UserStateService } from "@rose/core_services/user-state/user-state.service";
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";
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
  standalone: true,
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
  private readonly _router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);

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
            detail: "Logged out successfully.",
            life: 3000,
          });

          this.user.set(null);
          this._router.navigate(["/dashboard/home"]);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: "Your session expired. Please login again to continue.",
            life: 3000,
          });
        },
      });
  }
}

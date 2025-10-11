import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslateService } from "@ngx-translate/core";
// Environment
import { environment } from "@rose/environment/baseurl.dev";
// Services
import {
  StorageManagerService,
  UserDataService,
  UserStateService,
} from "@angular-monorepo/services";
// Auth API
import { AuthApiKpService, User } from "auth-api-kp";
// PrimeNg
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class LogoutService {
  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  loading = signal(false);

  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  protected readonly _userDataService = inject(UserDataService);
  logout() {
    this._authApiService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._userStateService.setLoggedIn(false);
          this._storageManagerService.removeItem("authToken");
          this._messageService.add({
            severity: "success",
            detail: "Logged out successfully.",
            life: 3000,
          });
          this.user.set(null);
          window.location.href = `${environment.runUrl}`;

          setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 0);
        },
        error: () => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.sessionExpired"),
            life: 3000,
          });
        },
      });
  }
}

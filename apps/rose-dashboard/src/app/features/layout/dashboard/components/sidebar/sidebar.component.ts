import { StorageManagerService, UserStateService } from "@angular-monorepo/services";
import { Component, DestroyRef, inject, PLATFORM_ID, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { environment } from "@rose/environment/baseurl.dev";
import { AuthApiKpService, User } from "auth-api-kp";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  hidden: boolean = false;
  user = signal<User | null>(null);

  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);

  changeHidden() {
    this.hidden = !this.hidden;
  }
  goToRose() {
    window.open(`${environment.runUrl}`, "_blank");
  }

  logout() {
    this._authApiService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this._userStateService.setLoggedIn(false);
          this._storageManagerService.removeItem("authToken");
          this._messageService.add({
            severity: "success",
            detail: "Logged out successfully.",
            life: 3000,
          });
          this.user.set(null);
          window.open(`${environment.runUrl}`, "_blank");

          setTimeout(() => {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 0);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.sessionExpired"),
            life: 3000,
          });
        },
      });
  }
}

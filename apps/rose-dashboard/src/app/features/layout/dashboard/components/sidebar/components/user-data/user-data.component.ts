import { Component, DestroyRef, inject, signal } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { Menu } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { AuthApiKpService, User } from "auth-api-kp";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import {
  StorageManagerService,
  UserDataService,
  UserStateService,
} from "@angular-monorepo/services";
import { environment } from "@rose/environment/baseurl.dev";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ButtonThemeComponent, TranslateToggleComponent } from "@angular-monorepo/rose-buttons";

@Component({
  selector: "app-user-data",
  imports: [ButtonModule, Menu, ButtonThemeComponent, TranslateToggleComponent],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.scss",
})
export class UserDataComponent {
  user = signal<User | null>(null);

  isLoggedIn = signal<boolean>(false);
  loading = signal(false);

  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  protected readonly _userDataService = inject(UserDataService);

  ngOnInit() {
    this._userDataService.loadUserInfo();
  }

  userDropDown: MenuItem[] = [
    {
      label: this._userDataService.userName(),
      escape: true,
    },
    {
      separator: true,
    },
    {
      label: this._translate.instant("navbar.menu.myProfile"),
      icon: "pi pi-user",
      command: () => this._router.navigate(["/dashboard/user-profile"]),
    },
    {
      separator: true,
    },
    {
      label: this._translate.instant("navbar.menu.logout"),
      icon: "pi pi-sign-out",
      command: () => {
        this.logout();
        this._storageManagerService.removeItem("authToken");
      },
    },
  ];

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
          window.open(`${environment.runUrl}`);

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

import { Component, effect, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
// Translate
import { TranslateService } from "@ngx-translate/core";
// Services Libs
import { StorageManagerService, UserDataService } from "@angular-monorepo/services";
// Components Libs
import { ButtonThemeComponent, TranslateToggleComponent } from "@angular-monorepo/rose-buttons";
import { UserPhotoComponent } from "@rose_dashboard/shared_buisness/user-photo/user-photo.component";
// Services
import { LogoutService } from "@rose_dashboard/core_services/logout/logout.service";
// Auth Lib
import { User } from "auth-api-kp";
// PrimeNG
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-user-data",
  imports: [ButtonModule, Menu, ButtonThemeComponent, TranslateToggleComponent, UserPhotoComponent],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.scss",
})
export class UserDataComponent implements OnInit, OnDestroy {
  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  loading = signal<boolean>(false);

  userDropDown: MenuItem[] = [];

  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _storageManagerService = inject(StorageManagerService);
  protected readonly _userDataService = inject(UserDataService);
  private readonly _logoutService = inject(LogoutService);

  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const name = this._userDataService.userName();
      this.userDropDown = this.buildUserDropdown(name);
    });
  }

  ngOnInit(): void {
    this._userDataService.loadUserInfo();

    this._translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const name = this._userDataService.userName();
      this.userDropDown = this.buildUserDropdown(name);
    });
  }

  private buildUserDropdown(userName: string): MenuItem[] {
    return [
      { separator: true },
      {
        label: this._translate.instant("menu.account"),
        icon: "pi pi-user",
        command: () => this._router.navigate(["/dashboard/user-profile"]),
      },
      { separator: true },
      {
        label: this._translate.instant("menu.documentation"),
        icon: "pi pi-book",
        command: () => window.open("/documentation", "_blank"),
      },
      { separator: true },
      {
        label: this._translate.instant("menu.logout"),
        icon: "pi pi-sign-out",
        command: () => {
          this.logout();
          this._storageManagerService.removeItem("authToken");
        },
      },
    ];
  }

  logout(): void {
    this._logoutService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

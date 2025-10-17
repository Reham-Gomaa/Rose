import { Component, effect, inject, signal } from "@angular/core";
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

@Component({
  selector: "app-user-data",
  imports: [ButtonModule, Menu, ButtonThemeComponent, TranslateToggleComponent, UserPhotoComponent],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.scss",
})
export class UserDataComponent {

  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  loading = signal(false);
  userDropDown: MenuItem[] = [];

  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _storageManagerService = inject(StorageManagerService);
  protected readonly _userDataService = inject(UserDataService);
  private readonly _logoutService = inject(LogoutService);


  constructor() {
    effect(() => {
      const name = this._userDataService.userName();
      this.buildUserDropdown(name);
    });
  }

  ngOnInit() {
    this._userDataService.loadUserInfo();
  }

  private buildUserDropdown(userName: string) {
    this.userDropDown = [
      {
        label: userName || "Guest",
        escape: true,
      },
      {
        separator: true,
      },
      {
        label: this._translate.instant("menu.account"),
        icon: "pi pi-user",
        command: () => this._router.navigate(["/dashboard/user-profile"]),
      },
      {
        separator: true,
      },
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

  logout() {
    this._logoutService.logout();
  }
}

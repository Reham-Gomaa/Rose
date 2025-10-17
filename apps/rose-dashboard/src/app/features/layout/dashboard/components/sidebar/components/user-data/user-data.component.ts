import { Component, effect, inject, signal } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { StorageManagerService, UserDataService } from "@angular-monorepo/services";
import { ButtonThemeComponent, TranslateToggleComponent } from "@angular-monorepo/rose-buttons";
import { UserPhotoComponent } from "@rose_dashboard/shared_buisness/user-photo/user-photo.component";
import { LogoutService } from "@rose_dashboard/core_services/logout/logout.service";
import { User } from "auth-api-kp";

@Component({
  selector: "app-user-data",
  imports: [ButtonModule, Menu, ButtonThemeComponent, TranslateToggleComponent, UserPhotoComponent],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.scss",
})
export class UserDataComponent {
  // Reactive states
  user = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  loading = signal(false);

  // Injected services
  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _storageManagerService = inject(StorageManagerService);
  protected readonly _userDataService = inject(UserDataService);
  private readonly _logoutService = inject(LogoutService);

  // Dropdown menu items (will be updated dynamically)
  userDropDown: MenuItem[] = [];

  constructor() {
    // Reactively rebuild dropdown whenever username changes
    effect(() => {
      const name = this._userDataService.userName(); // signal or getter
      this.buildUserDropdown(name);
    });
  }

  ngOnInit() {
    // Load user info (possibly from API/localStorage)
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

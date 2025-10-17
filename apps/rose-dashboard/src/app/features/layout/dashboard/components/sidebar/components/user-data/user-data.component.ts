import { Component, inject, signal, OnDestroy } from "@angular/core";
import { MenuItem } from "primeng/api";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { Subject, takeUntil } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { StorageManagerService, UserDataService } from "@angular-monorepo/services";
import { ButtonThemeComponent, TranslateToggleComponent } from "@angular-monorepo/rose-buttons";
import { UserPhotoComponent } from "@rose_dashboard/shared_buisness/user-photo/user-photo.component";
import { LogoutService } from "@rose_dashboard/core_services/logout/logout.service";
import { User } from "auth-api-kp";

@Component({
  selector: "app-user-data",
  imports: [ButtonModule, MenuModule, ButtonThemeComponent, TranslateToggleComponent, UserPhotoComponent],
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.scss"],
})
export class UserDataComponent implements OnDestroy {
  user = signal<User | null>(null);

  isLoggedIn = signal<boolean>(false);
  loading = signal(false);

  private readonly _translate = inject(TranslateService);
  private readonly _router = inject(Router);
  private readonly _storageManagerService = inject(StorageManagerService);
  protected readonly _userDataService = inject(UserDataService);
  private readonly _logoutService = inject(LogoutService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this._userDataService.loadUserInfo();
    this.userDropDown = this.buildUserDropdown();

    this._translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.userDropDown = this.buildUserDropdown();
    });
  }

  userDropDown: MenuItem[] = [];

  private buildUserDropdown(): MenuItem[] {
    return [
      {
        label: this._userDataService.userName(),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

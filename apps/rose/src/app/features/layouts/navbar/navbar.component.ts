import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Services
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";
import { UserStateService } from "@rose/core_services/user-state/user-state.service";
// Shared_UI_Components
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
// Shared_business_Components
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
// PrimeNg
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { SplitButton } from "primeng/splitbutton";
// Auth_Lib
import { AuthApiKpService } from "auth-api-kp";
// Interface_Lib
import { User } from "auth-api-kp";
// Ngrx
import { Store } from "@ngrx/store";
import { setUserName } from "../../../store/address/address.actions";

type modalPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "topleft"
  | "topright"
  | "bottomleft"
  | "bottomright";

@Component({
  selector: "app-navbar",
  imports: [
    Menubar,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    TranslatePipe,
    ButtonThemeComponent,
    Dialog,
    InputTextModule,
    SearchModalComponent,
    TranslateToggleComponent,
    NgOptimizedImage,
    InputIcon,
    IconField,
    InputTextModule,
    FormsModule,
    SplitButton,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
  host: { ngSkipHydration: "true" },
  animations: [fadeTransition],
})
export class NavbarComponent implements OnInit {
  readonly _translationService = inject(TranslationService);
  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  private readonly _store = inject(Store);

  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  isLoggedIn = signal<boolean>(false);
  btnClass = signal("loginBtn");
  currentLang = signal("");
  userName = signal("Guest");
  visible = signal(false);
  inSearch = signal(false);
  position = signal<modalPosition>("center");
  items = signal<MenuItem[]>([]);
  userDropDown = signal<MenuItem[]>([]);
  user = signal<User | null>(null);
  loading = signal(false);

  showDialog(position: modalPosition) {
    this.position.set(position);
    this.visible.set(true);
  }

  openSearch() {
    this.inSearch.set(true);
    this.searchModal.closeSearch = false;
  }

  ngOnInit() {
    this._userStateService.loggedIn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const token = this._storageManagerService.getItem("authToken");
      this.isLoggedIn.set(!!token);
    });

    this.loadUserInfo();
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    this.items.set([
      {
        label: "navbar.home",
        route: "home",
        icon: "pi pi-home",
      },
      {
        label: "navbar.allcategory",
        route: "all-categories",
        icon: "pi pi-clipboard",
      },
      {
        label: "navbar.about",
        route: "about",
        icon: "pi pi-info-circle",
      },
      {
        label: "navbar.contact",
        route: "contact",
        icon: "pi pi-headphones",
      },
    ]);

    this.updateUserDropdown();
  }

  private updateUserDropdown() {
    const user = this.user();
    this.userDropDown.set([
      {
        label: user
          ? `${user.firstName} ${user.lastName}`
          : this._translate.instant("navbar.menu.guest"),
        escape: true,
      },
      {
        separator: true,
      },
      {
        label: this._translate.instant("navbar.menu.myProfile"),
        icon: "pi pi-user",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/user-profile"]),
      },
      {
        label: this._translate.instant("navbar.menu.myAddresses"),
        icon: "pi pi-map-marker",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/order-flow/address"]),
      },
      {
        label: this._translate.instant("navbar.menu.myOrders"),
        icon: "pi pi-receipt",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/orders"]),
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: this._translate.instant("navbar.menu.dashboard"),
        icon: "pi pi-cog",
        command: () => this._router.navigate(["/dashboard/user-dashboard"]),
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: this._translate.instant("navbar.menu.logout"),
        icon: "pi pi-sign-out",
        command: () => {
          this.logout();
          this._storageManagerService.removeItem("authToken");
        },
      },
    ]);
  }

  loadUserInfo(): void {
    const token = this._storageManagerService.getItem("authToken");
    if (!token) return;

    this.loading.set(true);
    this._authApiService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.user.set(res.user);
          this.userName.set(`${res.user.firstName} ${res.user.lastName}`);
          this._store.dispatch(setUserName({ userName: this.userName() }));
          this.updateUserDropdown();
          this.loading.set(false);
        },
        error: (err) => {
          this.userName.set("Guest");
          this.updateUserDropdown();
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedLoadProfile"),
            life: 3000,
          });
          this.loading.set(false);
        },
      });
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
          this._router.navigate(["/dashboard/home"]);

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

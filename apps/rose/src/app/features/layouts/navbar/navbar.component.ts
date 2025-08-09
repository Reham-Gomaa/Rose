import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { SplitButton } from "primeng/splitbutton";
import { AuthApiKpService } from "auth-api-kp";
import { User } from "auth-api-kp";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";

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
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  // Signals
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

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this._translationService.changeLang(lang);
  }

  openSearch() {
    this.inSearch.set(true);
    this.searchModal.closeSearch = false;
  }

  ngOnInit() {
    this.isLogin();
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
        label: user ? `${user.firstName} ${user.lastName}` : "Guest",
        escape: true,
      },
      {
        separator: true,
      },
      {
        label: "My Profile",
        icon: "pi pi-user",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/user-profile"]),
      },
      {
        label: "My Addresses",
        icon: "pi pi-map-marker",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/address"]),
      },
      {
        label: "My Orders",
        icon: "pi pi-receipt",
        visible: !!user,
        command: () => this._router.navigate(["/order-flow/orders"]),
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: "Dashboard",
        icon: "pi pi-cog",
        command: () => this._router.navigate(["/user-dashboard"]),
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: "Log out",
        icon: "pi pi-sign-out",
        command: () => this.logout(),
      },
    ]);
  }
  isLogin(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    const token = localStorage.getItem("authToken");
    this.isLoggedIn.set(!!token);
  }

  loadUserInfo(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    const token = localStorage.getItem("authToken");
    if (!token) return;

    this.loading.set(true);
    this._authApiService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.user.set(res.user);
          this.userName.set(`${res.user.firstName} ${res.user.lastName}`);
          this.updateUserDropdown();
          this.loading.set(false);
        },
        error: (err) => {
          console.error("Failed to load profile:", err);
          this._messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to load user profile",
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
          this._messageService.add({
            severity: "success",
            detail: "Logged out successfully.",
            life: 3000,
          });

          this.isLoggedIn.set(false);
          this.user.set(null);
          this.userName.set("Guest");
          this.updateUserDropdown();

          if (isPlatformBrowser(this._platformId)) {
            localStorage.removeItem("authToken");
          }
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

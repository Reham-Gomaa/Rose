import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from "@angular/core";
// Router
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations_Translation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Shared_Components
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
// primeNg
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";

import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { SplitButton } from "primeng/splitbutton";
import { AuthApiKpService } from "auth-api-kp";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
  readonly translationService = inject(TranslationService);
  private readonly _auth = inject(AuthApiKpService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;
  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  btnClass = signal("loginBtn");
  currentLang = signal("");
  userName = signal("John Doe");
  visible = signal(false);
  inSearch = signal(false);
  position = signal<modalPosition>("center");

  items = signal<MenuItem[]>([]);
  userDropDown = signal<MenuItem[]>([]);
  private _msg: any;

  showDialog(position: modalPosition) {
    this.position.set(position);
    this.visible.set(true);
  }

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.changeLang(lang);
  }

  openSearch() {
    this.inSearch.set(true);
    this.searchModal.closeSearch = false;
  }

  ngOnInit() {
    this.isLogin();
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

    this.userDropDown.set([
      {
        label: this.userName(),
        route: "",
        icon: "",
        escape: false,
      },
      {
        separator: true,
      },
      {
        label: "My Profile",
        route: "user-profile",
        icon: "pi pi-user",
      },
      {
        label: "My Addresses",
        route: "user-addresses",
        icon: "pi pi-map-marker",
      },
      {
        label: "My Orders",
        route: "user-orders",
        icon: "pi pi-receipt",
      },
      {
        separator: true,
      },
      {
        label: "Dashboard",
        route: "user-dashboard",
        icon: "pi pi-cog",
      },
      {
        separator: true,
      },
      {
        label: "Log out",
        icon: "pi pi-sign-out",
        command: () => this.logout(),
      },
    ]);
  }

  isLogin(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = localStorage.getItem("authToken");
    this.isLoggedIn.set(!!token);
  }

  logout(): void {
    this._auth
      .logout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if ("message" in res && res.message === "Logged out successfully.") {
            localStorage.removeItem("authToken");
            this.isLoggedIn.set(false);
            this._msg.add({ severity: "success", detail: res.message, life: 3000 });
            this._router.navigate(["/"]);
          } else {
            this._msg.add({
              severity: "error",
              detail: "Logout failed. Please try again.",
              life: 5000,
            });
          }
        },
        error: () => {
          this._msg.add({
            severity: "error",
            detail: "Logout failed. Please try again.",
            life: 5000,
          });
        },
      });
  }
}

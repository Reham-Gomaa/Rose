// @angular
import { AsyncPipe, isPlatformBrowser, NgOptimizedImage } from "@angular/common";
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// rxjs
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable } from "rxjs";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Store
import { Store } from "@ngrx/store";
import { setUserName } from "../../../store/address/address.actions";
import { getUserCart } from "../../../store/cart/cart-actions";
import { selectCartItemsNum } from "../../../store/cart/cart-selectors";
import { selectWishlistCount } from "../../../store/wishlist/wishlist-selectors";
// Shared Services and components
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
import { CartService } from "@rose/shared_services/cart/cart.service";
// Lib
import { AuthApiKpService } from "auth-api-kp";
// Prime
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { SplitButton } from "primeng/splitbutton";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
  passwordResetCode?: string;
  passwordResetExpires?: string;
  resetCodeVerified?: boolean;
  passwordChangedAt?: string;
}

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
    AsyncPipe,
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
  cartService = inject(CartService);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _store = inject(Store);
  private readonly router = inject(Router);

  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;
  cartItemsNum$!: Observable<number>;
  favouriteItemsNum$!: Observable<number>;
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
  user = signal<UserProfile | null>(null);
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
    this.getUserCart();
    this.favouriteItemsNum$ = this._store.select(selectWishlistCount);
  }

  private initializeMenuItems() {
    this.items.set([
      {
        label: "navbar.home",
        route: "/dashboard/home",
      },
      {
        label: "navbar.allcategory",
        route: "/dashboard/all-categories",
      },
      {
        label: "navbar.about",
        route: "/dashboard/about",
      },
      {
        label: "navbar.contact",
        route: "/dashboard/contact",
      },
    ]);

    this.updateUserDropdown();
  }

  private updateUserDropdown() {
    const user = this.user();
    this.userDropDown.set([
      {
        label: user ? `${user.firstName} ${user.lastName}` : "Guest",
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
        visible: !!user,
      },
      {
        label: "My Addresses",
        route: "user-addresses",
        icon: "pi pi-map-marker",
        visible: !!user,
      },
      {
        label: "My Orders",
        route: "user-orders",
        icon: "pi pi-receipt",
        visible: !!user,
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: "Dashboard",
        route: "user-dashboard",
        icon: "pi pi-cog",
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

  getUserCart() {
    if (this.isLoggedIn()) {
      this._store.dispatch(getUserCart());
    }
    this.cartItemsNum$ = this._store.select(selectCartItemsNum);
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
          this._store.dispatch(setUserName({ userName: this.userName() }));
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
          this.router.navigate(["dashboard/home"]);
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

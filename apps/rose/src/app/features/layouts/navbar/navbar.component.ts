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
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// Translate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/services";
// Animation
import { fadeTransition } from "@angular-monorepo/services";
// Services
import { StorageManagerService } from "@angular-monorepo/services";
import { UserStateService } from "@angular-monorepo/services";
import { CartService } from "@rose/shared_services/cart/cart.service";
// Shared_UI_Components
import { ButtonThemeComponent } from "@angular-monorepo/rose-buttons";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
// Shared_business_Components
import { TranslateToggleComponent } from "@angular-monorepo/rose-buttons";
// PrimeNg
import { MenuItem, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { SplitButton } from "primeng/splitbutton";
// Auth_Lib
import { AuthApiKpService } from "auth-api-kp";
// Environment
import { environment } from "@rose/environment/baseurl.dev";
// Interface_Lib
import { User } from "auth-api-kp";
// Ngrx
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { setUserName } from "../../../store/address/address.actions";
import { getUserCart } from "../../../store/cart/cart-actions";
import { selectCartItemsNum } from "../../../store/cart/cart-selectors";
import { selectWishlistCount } from "../../../store/wishlist/wishlist-selectors";
import { getUserWishlist } from "../../../store/wishlist/wishlist-actions";

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
  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);
  private readonly _store = inject(Store);

  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;
  cartItemsNum$!: Observable<number>;
  favouriteItemsNum$!: Observable<number>;

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
  navHidden = signal(false);

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

    this._translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.currentLang.set(this._translate.currentLang);
      this.initializeMenuItems();
    });

    this.navHidden.set(this._router.url.includes("documentation"));

    this.loadUserInfo();
    this.getUserCart();
    this.getWishlist();
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
    const isAdmin = user?.role === "admin";
    this.userDropDown.set([
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
        command: () => this._router.navigate(["/dashboard/address"]),
      },
      {
        label: this._translate.instant("navbar.menu.myOrders"),
        icon: "pi pi-receipt",
        visible: !!user,
        command: () => this._router.navigate(["/dashboard/allOrders"]),
      },
      {
        separator: true,
        visible: !!user,
      },
      {
        label: this._translate.instant("navbar.menu.dashboard"),
        icon: "pi pi-cog",
        visible: isAdmin,
        command: () => {
          const token = this._storageManagerService.getItem("authToken");
          if (token) {
            window.open(
              `${environment.runUrlDashboard}?token=${encodeURIComponent(token)}`,
              "_blank",
            );
          }
        },
      },
      {
        label: this._translate.instant("navbar.menu.documentation"),
        icon: "pi pi-book",
        visible: isAdmin,
        command: () => this._router.navigate(["/dashboard/documentation"]),
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

  getUserCart() {
    if (this.isLoggedIn()) {
      this._store.dispatch(getUserCart());
    }
    this.cartItemsNum$ = this._store.select(selectCartItemsNum);
  }

  getWishlist() {
    if (this.isLoggedIn()) {
      this._store.dispatch(getUserWishlist());
    }

    this.favouriteItemsNum$ = this._store.select(selectWishlistCount);
  }

  isLogin(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    const token = localStorage.getItem("authToken");
    this.isLoggedIn.set(!!token);
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

          if (res.user.role !== "admin" && this._router.url.includes("/dashboard")) {
            this._router.navigate(["/dashboard/home"]);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this._storageManagerService.removeItem("authToken");
          this.isLoggedIn.set(false);
          this.user.set(null);
          this.updateUserDropdown();
          if (this._router.url.includes("/dashboard")) {
            this._router.navigate(["/dashboard/home"]);
          }
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

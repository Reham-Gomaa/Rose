import { Component, DestroyRef, inject, PLATFORM_ID, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Libs_Services
import { StorageManagerService } from "@angular-monorepo/services";
import { DarkModeService } from "@angular-monorepo/services";
import { AuthApiKpService, User } from "auth-api-kp";
// Rxjs
import { filter } from "rxjs/operators";
// Components_Shared
import { NotificationToastComponent } from "@angular-monorepo/notification-toast";

@Component({
  imports: [RouterOutlet, NotificationToastComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  private readonly _storageManagerService = inject(StorageManagerService);
  protected platformId = inject(PLATFORM_ID);
  private readonly _authApiService = inject(AuthApiKpService);
  protected darkMode = inject(DarkModeService);
  private readonly destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  title = "rose dashboard";

  isLoggedIn = signal<boolean>(false);
  user = signal<User | null>(null);
  loading = signal(false);

  ngOnInit() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.handleTokenFromUrl();

      this.loadUserInfo();
    });

    this.handleTokenFromUrl();
    this.loadUserInfo();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.handleTokenFromUrl();
    }, 100);
  }

  private handleTokenFromUrl() {
    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.split("?")[1]);

      let token = this.route.snapshot.queryParamMap.get("token");

      if (!token) {
        token = urlParams.get("token");
      }

      if (!token) {
        token = hashParams.get("token");
      }

      if (token) {
        try {
          this._storageManagerService.setItem("authToken", token);

          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        } catch (error) {
          console.error("Error saving token:", error);
        }
      }
    }
  }

  loadUserInfo(): void {
    const token = this._storageManagerService.getItem("authToken");

    if (!token) {
      if (this._router.url.includes("/dashboard")) {
        this._router.navigate(["/authorization"]);
      }
      return;
    }

    this._authApiService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.user.set(res.user);
          this.loading.set(false);

          // if not admin → not-found
          if (res.user.role !== "admin" && this._router.url.includes("/dashboard")) {
            this._router.navigate(["/authorization"]);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this._storageManagerService.removeItem("authToken");
          this.isLoggedIn.set(false);
          this.user.set(null);

          // also send to not-found on error
          if (this._router.url.includes("/dashboard")) {
            this._router.navigate(["/authorization"]);
          }
        },
      });
  }
}

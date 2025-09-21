import { Component, inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from "@angular/router";
import { StorageManagerService } from "@angular-monorepo/services";

import { isPlatformBrowser } from "@angular/common";
import { filter } from "rxjs/operators";

// Services
import { DarkModeService } from "@angular-monorepo/services";
// Components_Shared
import { NotificationToastComponent } from "@angular-monorepo/notification-toast";
import { TranslationService } from "@angular-monorepo/translation";

@Component({
  imports: [RouterOutlet, NotificationToastComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  private translation = inject(TranslationService);
  title = "rose dashboard";

  private readonly _storageManagerService = inject(StorageManagerService);
  protected platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.handleTokenFromUrl();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.handleTokenFromUrl();
    });
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
}

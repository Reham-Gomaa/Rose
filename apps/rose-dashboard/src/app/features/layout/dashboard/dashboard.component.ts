import { Component, inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet, NavigationEnd } from "@angular/router";
import { StorageManagerService } from "@angular-monorepo/services";

import { isPlatformBrowser } from "@angular/common";
import { filter } from "rxjs/operators";
// Components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StepperComponent } from "./components/stepper/stepper.component";

@Component({
  selector: "app-dashboard",
  imports: [SidebarComponent, StepperComponent, RouterOutlet],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  private readonly _storageManagerService = inject(StorageManagerService);
  protected platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  title = "rose dashboard";

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
          console.log("Found token, saving:", token);
          this._storageManagerService.setItem("authToken", token);

          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        } catch (error) {
          console.error("Error saving token:", error);
        }
      } else {
        const existingToken = this._storageManagerService.getItem("authToken");
        console.log("Existing token in storage:", existingToken);
      }
    }
  }
}

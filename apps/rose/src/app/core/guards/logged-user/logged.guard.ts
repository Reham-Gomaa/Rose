import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { PlatformService } from "@rose/core_services/platform/platform.service";

export const loggedGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const platformService = inject(PlatformService);

  if (!platformService.isBrowser()) return true;

  const token = localStorage.getItem("authToken"); // Use consistent token key

  if (token) {
    return router.createUrlTree(["/dashboard/home"], {
      queryParamsHandling: "preserve",
    });
  }

  return true;
};

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { PlatformService } from "@rose/core_services/platform/platform.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformService = inject(PlatformService);

  if (platformService.isBrowser() && localStorage.getItem("authToken") != null) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};

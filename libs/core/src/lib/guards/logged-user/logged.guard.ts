import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { StorageManagerService } from "@angular-monorepo/services";

export const loggedGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const storage = inject(StorageManagerService);

  const token = storage.getItem("authToken");

  if (token) {
    return router.createUrlTree(["/dashboard/home"], {
      queryParamsHandling: "preserve",
    });
  }

  return true;
};

import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { StorageManagerService } from "@angular-monorepo/services";

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const storage = inject(StorageManagerService);

  const token = storage.getItem("authToken");

  if (token) {
    return true;
  } else {
    return router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url },
    });
  }
};

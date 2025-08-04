import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { PlatformService } from "@rose/core_services/platform/platform.service";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _platformService = inject(PlatformService);

  if (_platformService.checkPlatform() === "Browser") {
    let token = localStorage.getItem("authToken");
    token=`Bearer ${token}`
    if (token) {
      req = req.clone({
        setHeaders: { Authorization:token },
      });
    }
  }

  return next(req);
};

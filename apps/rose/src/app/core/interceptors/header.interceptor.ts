import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { PlatformService } from "@rose/core_services/platform/platform.service";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _platformService = inject(PlatformService);

  if (_platformService.checkPlatform() === "Browser") {
    const token = localStorage.getItem("userToken");
    if (token) {
      req = req.clone({
        setHeaders: { token },
      });
    }
  }

  return next(req);
};

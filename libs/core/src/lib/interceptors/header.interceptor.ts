import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { StorageManagerService } from "@angular-monorepo/services";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageManagerService);

  const token = _storage.getItem("authToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhhMDQ4MmVhOGJjYTMwN2Y5ZGRhNGJlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjAwOTcyNDV9.CySfecJbsVqmBi8jUNolPe2y2vAYRsThNaSsW4MFE4g";

  if (token) {
    if (!req.url.includes("statistics")) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    } else if (req.url.includes("statistics")) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${userToken}` },
      });
    }
  }

  return next(req);
};

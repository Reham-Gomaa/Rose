import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageManagerService);

  const token = _storage.getItem("authToken");

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};

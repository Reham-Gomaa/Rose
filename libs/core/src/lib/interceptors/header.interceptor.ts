import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { StorageManagerService } from "@angular-monorepo/services";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageManagerService);

  const token = _storage.getItem("authToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg4MzhkMDdhOGJjYTMwN2Y5ZDZhMzBkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjA2MDE3MTV9.EzYOU7rC6SgFOIB8ILS53ICzMnQMzHTd7WPAyK3uD20";

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

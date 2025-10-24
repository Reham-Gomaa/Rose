import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
// Services
import { StorageManagerService } from "@angular-monorepo/services";

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const _storage = inject(StorageManagerService);

  const token = _storage.getItem("authToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg4MzhkMDdhOGJjYTMwN2Y5ZDZhMzBkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjA5NDM4MzZ9.7AphdKkNqEVZbxm0vPRtzQp6PEQZ9TWTUYCxCqtFawQ";

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

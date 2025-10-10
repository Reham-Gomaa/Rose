import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject, NgZone } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
// Services
import { ErrorService } from "../services/error/error.service";

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const router = inject(Router);
  const zone = inject(NgZone);
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        errorService.showError("Network error. Please check your connection.");
      } else {
        switch (error.status) {
          case 401:
            errorService.showError("Unauthorized. Please login again.");
            zone.run(() => router.navigate(["/dashboard/error"]));
            break;
          case 404:
            errorService.showError("Resource not found.");
            zone.run(() => router.navigate(["/dashboard/error"]));
            break;
          case 500:
          case 501:
            errorService.showError("Server error. Please try again later.");
            zone.run(() => router.navigate(["/dashboard/error"]));
            break;
          default:
            errorService.showError(error.message || "Unexpected error occurred.");
        }
      }
      return throwError(() => error);
    }),
  );
};

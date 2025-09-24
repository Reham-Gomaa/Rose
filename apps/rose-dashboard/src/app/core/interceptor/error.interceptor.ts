import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ErrorService } from "../services/error.service";

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        errorService.showError("Network error. Please check your connection.");
      } else {
        switch (error.status) {
          case 404:
            errorService.showError("Resource not found.");
            break;
          case 500:
          case 501:
            errorService.showError("Server error. Please try again later.");
            break;
          default:
            errorService.showError(error.message || "Unexpected error occurred.");
        }
      }
      return throwError(() => error);
    }),
  );
};

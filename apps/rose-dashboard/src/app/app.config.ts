import { appRoutes } from "./app.routes";
// @angular imports
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withViewTransitions,
} from "@angular/router";
// Translate Title
import { headingInterceptor, TranslateTitleStrategy } from "@angular-monorepo/core";
// Auth LIB
import { API_CONFIG } from "auth-api-kp";
// primeng imports
import Aura from "@primeng/themes/aura";
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import { ToastModule } from "primeng/toast";
// Shared Libraries
import { provideTranslation } from "@angular-monorepo/translation";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([headingInterceptor])),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: "https://flower.elevateegy.com/api",
        apiVersion: "v1",
        endpoints: {
          auth: {
            login: "auth/signin",
            register: "auth/signup",
            logout: "auth/logout",
            forgotPassword: "auth/forgotPassword",
            verifyResetCode: "auth/verifyResetCode",
            resetPassword: "auth/resetPassword",
            profileData: "auth/profile-data",
            editProfile: "auth/editProfile",
            changePassword: "auth/change-password",
            deleteMe: "auth/deleteMe",
            uploadPhoto: "auth/upload-photo",
            forgetPasswordForm: "auth/forgetPasswordForm",
          },
        },
      },
    },
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
      }),
    ),
    { provide: TitleStrategy, useClass: TranslateTitleStrategy },
    provideHttpClient(withFetch()),
    MessageService,
    importProvidersFrom(ToastModule),
    importProvidersFrom(ToastModule, provideTranslation()),
    provideAnimationsAsync(),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "light-mode",
          cssLayer: false,
        },
      },
    }),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};

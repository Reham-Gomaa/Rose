import { Address } from "./core/interfaces/user-address.interface";
import { appRoutes } from "./app.routes";
// @angular imports
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, TitleStrategy, withInMemoryScrolling, withViewTransitions } from "@angular/router";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
// @ngx imports
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
// ngrx imports
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { FilterEffects } from "@rose/store_filter/filter.effect";
import { sortReducer } from "@rose/store_sort/sort.reducer";
import { filterReduser } from "@rose/store_filter/filter.reducer";
import { sortEffects } from "@rose/store_sort/store.effects";
// primeng imports
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeng/themes/aura";
import { ToastModule } from "primeng/toast";
// Auth LIB
import { API_CONFIG } from "auth-api-kp";
import { headingInterceptor } from "./core/interceptors/header.interceptor";
import { addressReducer } from "./store/address/address.reducer";
import { AddressEffect } from "./store/address/address.effect";

// Transelate Title
import { TranslateTitleStrategy } from "./core/strategies/translate-title.strategy";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
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
      })
    ),
    { provide: TitleStrategy, useClass: TranslateTitleStrategy },
    provideHttpClient(withFetch()),
    MessageService,
    importProvidersFrom(ToastModule),
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
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    provideStore({
      sort: sortReducer,
      filter: filterReduser,
      Address: addressReducer,
    }),
    provideEffects(sortEffects, FilterEffects, AddressEffect),
  ],
};

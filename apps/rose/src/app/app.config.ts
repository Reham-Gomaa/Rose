import { appRoutes } from "./app.routes";
// @angular imports
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling, withViewTransitions } from "@angular/router";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
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
import { cartReducer } from "./store/cart/cart-reducers";
import { CartEffects } from "./store/cart/cart-effects";
// primeng imports
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeng/themes/aura";
import { ToastModule } from "primeng/toast";
// Auth LIB
import { API_CONFIG } from "auth-api-kp";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: "https://flower.elevateegy.com/api/",
        apiVersion: "v1",
        endpoints: {
          auth: {
            login: "auth/signin",
            register: "auth/signup",
            logout: "auth/logout",
            forgotPassword: "auth/forgotPassword",
            verifyResetCode: "auth/verifyResetCode",
            resetPassword: "auth/resetPassword",
            profileData: "auth/profileData",
            editProfile: "auth/editProfile",
            changePassword: "auth/changePassword",
            deleteMe: "auth/deleteMe",
            uploadPhoto: "auth/uploadPhoto",
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
      cart: cartReducer,
    }),
    provideEffects(sortEffects, FilterEffects, CartEffects),
  ],
};

import { appRoutes } from "./app.routes";
// @angular imports
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter, withInMemoryScrolling, withViewTransitions } from "@angular/router";
// @ngx imports
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// ngrx imports
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
// Store
import { FilterEffects } from "@rose/store_filter/filter.effect";
import { filterReduser } from "@rose/store_filter/filter.reducer";
import { sortReducer } from "@rose/store_sort/sort.reducer";
import { sortEffects } from "@rose/store_sort/store.effects";
import { AddressEffect } from "./store/address/address.effect";
import { addressReducer } from "./store/address/address.reducer";
import { CartEffects } from "./store/cart/cart-effects";
import { cartReducer } from "./store/cart/cart-reducers";
import { wishlistReducer } from "./store/wishlist/wishlist-reducers";
// primeng imports
import Aura from "@primeng/themes/aura";
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import { ToastModule } from "primeng/toast";
// Auth LIB
import { API_CONFIG } from "auth-api-kp";
import { headingInterceptor } from "./core/interceptors/header.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([headingInterceptor])),
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
      wishlist: wishlistReducer,
      Address: addressReducer,
    }),
    provideEffects(sortEffects, FilterEffects, CartEffects, AddressEffect),
  ],
};

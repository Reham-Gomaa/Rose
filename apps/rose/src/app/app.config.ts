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
import { checkoutEffects } from "./store/checkout/checkout.effects";
import { checkoutReducer } from "./store/checkout/checkout.reducer";
import { wishlistReducer } from "./store/wishlist/wishlist-reducers";
import { WishlistEffects } from "./store/wishlist/wishlist-effects";
import { tokenReducer } from "@rose/store_auth/auth.reducers";
import { AuthEffects } from "@rose/store_auth/auth.effects";
// primeng imports
import Aura from "@primeng/themes/aura";
import { MessageService } from "primeng/api";
import { providePrimeNG } from "primeng/config";
import { ToastModule } from "primeng/toast";
// Auth LIB
import { API_CONFIG } from "auth-api-kp";
// Header Interceptor
import { headingInterceptor, TranslateTitleStrategy } from "@angular-monorepo/core";
// Environment
import { environment } from "apps/environment/baseurl.dev";
// Translate Title
import { provideTranslation } from "@angular-monorepo/services";
// Shared Libraries
import { API_BASE_URL_CATEGORIES } from "@angular-monorepo/categories";
import { BASE_URL } from "@angular-monorepo/occasions";
import { API_BASE_URL_PRODUCTS } from "@angular-monorepo/products";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([headingInterceptor])),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: `${environment.baseApiUrl}api`,
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
    {
      provide: API_BASE_URL_PRODUCTS,
      useValue: environment.baseApiUrl,
    },
    {
      provide: API_BASE_URL_CATEGORIES,
      useValue: environment.baseApiUrl,
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
    provideStore({
      sort: sortReducer,
      filter: filterReduser,
      cart: cartReducer,
      wishlist: wishlistReducer,
      Address: addressReducer,
      checkout: checkoutReducer,
      auth: tokenReducer,
    }),
    provideEffects(
      sortEffects,
      FilterEffects,
      AddressEffect,
      checkoutEffects,
      CartEffects,
      WishlistEffects,
      AuthEffects,
    ),

    {
      provide: BASE_URL,
      useValue: environment.baseApiUrl,
    },
  ],
};

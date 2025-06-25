import { appRoutes } from "./app.routes";

// @angular imports ....
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";

// @ngx imports ....
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

// primeng imports ....

import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { sortReducer } from './store/sort/sort.reducer';
import { sortEffects } from './store/sort/store.effects';
import { filterReduser } from "./store/filter/filter.reducer";



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    MessageService,

    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "light-mode",
          cssLayer: false,

        },
    }}),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    importProvidersFrom(TranslateModule.forRoot({
        loader: {

            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })),
    provideStore({
      sort:sortReducer,
      filter:filterReduser
    }),
    provideEffects(sortEffects)
],

};

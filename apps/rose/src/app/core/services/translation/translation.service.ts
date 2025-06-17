import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translateService = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly cookieService = inject(SsrCookieService);

  defaultLang = 'en';
  private readonly cookieName = 'lng';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = this.cookieService.get(this.cookieName);
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setDefaultLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
      this.changeDir();
    }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
      if (isPlatformBrowser(this.platformId)) {
    try {
      this.cookieService.set(this.cookieName, lang);
      this.changeDir();
    } catch (e) {
      console.error('Error setting cookie:', e);
    }
  }
  }

  changeDir() {
    const savedLang = this.cookieService.get(this.cookieName);
    const html = this.document.documentElement;

    if (savedLang == 'en') {
      html.setAttribute('dir', 'ltr');
    } else if (savedLang == 'ar') {
      html.setAttribute('dir', 'rtl');
    }
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }

}

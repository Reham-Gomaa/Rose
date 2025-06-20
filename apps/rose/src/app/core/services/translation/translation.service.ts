import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translateService = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  defaultLang = 'en';
  private readonly cookieName = 'lng';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lng');
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
      localStorage.setItem('lng' , lang);
      this.changeDir();
  }
  }

  changeDir() {
    const savedLang = localStorage.getItem('lng');
    const html = this.document.documentElement;

    if (savedLang == 'en') {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    } else if (savedLang == 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    }
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }

}

import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
//Translation
import { TranslateService } from "@ngx-translate/core";
// SSR Cookie Service
import { SsrCookieService } from "ngx-cookie-service-ssr";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  fadeState: WritableSignal<"visible" | "hidden"> = signal("visible");

  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly ssrCookieService = inject(SsrCookieService);

  private readonly cookieName = "lng";
  defaultLang = "en";

  constructor() {
    const savedLang = this.ssrCookieService.get(this.cookieName);
    if (savedLang) {
      this.defaultLang = savedLang;
    }
    this.translateService.setDefaultLang(this.defaultLang);
    this.translateService.use(this.defaultLang);
    this.changeDir();
  }

  changeLang(lang: string) {
    this.fadeState.set("hidden");
    this.ssrCookieService.set(this.cookieName, lang, { expires: 30 });
    setTimeout(() => {
      this.translateService.use(lang);
      this.changeDir();
      this.fadeState.set("visible");
    }, 400);
  }

  changeDir() {
    const savedLang = this.ssrCookieService.get(this.cookieName);
    const html = this.document.documentElement;

    if (savedLang == "en") {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    } else if (savedLang == "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    }
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }
}

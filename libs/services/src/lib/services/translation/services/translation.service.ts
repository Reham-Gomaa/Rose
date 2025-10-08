import { DOCUMENT } from "@angular/common";
import {
  inject,
  Injectable,
  Renderer2,
  RendererFactory2,
  signal,
  WritableSignal,
} from "@angular/core";
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
  private readonly rendererFactory2 = inject(RendererFactory2);

  private readonly cookieName = "lng";
  renderer!: Renderer2;
  defaultLang = "en";

  constructor() {
    const savedLang = this.ssrCookieService.get(this.cookieName);
    if (savedLang) {
      this.defaultLang = savedLang;
    }
    this.renderer = this.rendererFactory2.createRenderer(null, null);
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
      this.renderer.setAttribute(html, "dir", "ltr");
      this.renderer.setAttribute(html, "lang", "en");
    } else if (savedLang == "ar") {
      this.renderer.setAttribute(html, "dir", "rtl");
      this.renderer.setAttribute(html, "lang", "ar");
    }
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }

  instant(key: string): string {
    return this.translateService.instant(key);
  }
}

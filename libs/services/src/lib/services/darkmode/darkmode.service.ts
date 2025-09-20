import { Injectable, Renderer2, RendererFactory2, effect, inject, signal } from "@angular/core";
import { DOCUMENT } from "@angular/common";
// SSR Cookie Service
import { SsrCookieService } from "ngx-cookie-service-ssr";

@Injectable({ providedIn: "root" })
export class DarkModeService {
  private readonly document = inject(DOCUMENT);
  private readonly ssrCookieService = inject(SsrCookieService);
  private readonly rendererFactory2 = inject(RendererFactory2);

  private readonly STORAGE_KEY = "darkMode";

  isDark = signal<boolean>(false);
  renderer!: Renderer2;

  ngOnInit() {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
    this.initializeTheme();
    this.setupThemeListener();
  }

  toggle(): void {
    this.isDark.update((value) => !value);
  }

  private initializeTheme(): void {
    const savedMode = this.ssrCookieService.get(this.STORAGE_KEY);
    if (savedMode !== null) {
      this.isDark.set(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.isDark.set(prefersDark);
    }
    this.applyTheme(this.isDark());
  }

  private setupThemeListener(): void {
    effect(() => {
      const isDark = this.isDark();
      this.ssrCookieService.set(this.STORAGE_KEY, String(isDark), { expires: 30 });
      this.applyTheme(isDark);
    });
  }

  private applyTheme(isDark: boolean): void {
    const html = this.document.documentElement;
    if (isDark) {
      this.renderer.addClass(html, "dark-mode");
    } else {
      this.renderer.removeClass(html, "dark-mode");
    }
  }
}

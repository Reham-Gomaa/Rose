import { Injectable, effect, inject, signal } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { PlatformService } from "../platform/platform.service";

@Injectable({ providedIn: "root" })
export class DarkModeService {
  private readonly document = inject(DOCUMENT);
  private readonly platform = inject(PlatformService);

  private readonly STORAGE_KEY = "darkMode";

  isDark = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
    this.setupThemeListener();
  }

  toggle(): void {
    this.isDark.update((value) => !value);
  }

  private initializeTheme(): void {
    if (!this.platform.isBrowser()) return;

    const savedMode = localStorage.getItem(this.STORAGE_KEY);
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
      if (this.platform.isBrowser()) {
        localStorage.setItem(this.STORAGE_KEY, String(isDark));
      }
      this.applyTheme(isDark);
    });
  }

  private applyTheme(isDark: boolean): void {
    if (!this.platform.isBrowser()) return;
    const html = this.document.documentElement;
    if (isDark) {
      html.classList.add("dark-mode");
    } else {
      html.classList.remove("dark-mode");
    }
  }
}

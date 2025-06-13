import { Injectable, signal, effect, inject } from '@angular/core';
import { PlatformService } from '../platform/platform.service';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private readonly platform = inject(PlatformService);
  private readonly STORAGE_KEY = 'theme';
  private readonly DARK_MODE_CLASS = 'dark-mode';
  private readonly PRIMENG_DARK_THEME = 'soho-dark';
  private readonly PRIMENG_LIGHT_THEME = 'soho-light';

  isDark = signal(false);

  constructor() {
    if (this.platform.isBrowser()) {
      this.initializeTheme();
      this.setupSystemPreferenceListener();

      effect(() => {
        const isDark = this.isDark();
        localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
        this.applyThemeClass(isDark);
        this.applyPrimeNGTheme(isDark);
      });
    }
  }

  toggle(): void {
    this.isDark.update(value => !value);
  }

  setDarkMode(isDark: boolean): void {
    this.isDark.set(isDark);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    this.isDark.set(initialTheme);
    this.applyThemeClass(initialTheme);
    this.applyPrimeNGTheme(initialTheme);
  }

  private applyThemeClass(isDark: boolean): void {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add(this.DARK_MODE_CLASS);
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.classList.remove(this.DARK_MODE_CLASS);
      htmlElement.setAttribute('data-theme', 'light');
    }
  }

  private applyPrimeNGTheme(isDark: boolean): void {
    if (this.platform.isBrowser()) {
      const themeLink = document.getElementById('primeng-theme') as HTMLLinkElement;
      if (themeLink) {
        themeLink.href = isDark
          ? `node_modules/primeng/resources/themes/${this.PRIMENG_DARK_THEME}/theme.css`
          : `node_modules/primeng/resources/themes/${this.PRIMENG_LIGHT_THEME}/theme.css`;
      }
    }
  }

  private setupSystemPreferenceListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.isDark.set(e.matches);
      }
    });
  }
}

import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class PlatformService {
  private readonly platformId = inject(PLATFORM_ID);

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
    isServer(): boolean {
    return !this.isBrowser();
  }

  checkPlatform(): "Browser" | "Server" {
    return this.isBrowser() ? "Browser" : "Server";
  }
}

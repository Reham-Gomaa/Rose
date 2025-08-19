import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageManagerService {
  authToken() {
    throw new Error("Method not implemented.");
  }
  private readonly pID = inject(PLATFORM_ID);

  isLoggedIn = signal<boolean>(false);
  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  getItem(key: string) {
    if (isPlatformBrowser(this.pID)) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }
  removeItem(key: string): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.removeItem(key);
      this.isLoggedIn.set(false);
    }
  }
  clear(): void {
    if (isPlatformBrowser(this.pID)) {
      localStorage.clear();
    }
  }
}

import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  errorMessage = signal<string | null>(null);

  showError(message: string) {
    this.errorMessage.set(message);
  }

  clearError() {
    this.errorMessage.set(null);
  }
}

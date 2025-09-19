import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
// Translation
import { TranslationService } from "@angular-monorepo/translation";
@Component({
  selector: "app-translate-toggle",
  imports: [],
  templateUrl: "./translate-toggle.component.html",
  styleUrl: "./translate-toggle.component.scss",
})
export class TranslateToggleComponent implements OnInit {
  private readonly translationService = inject(TranslationService);

  currentLang: WritableSignal<string> = signal("");

  setLanguage() {
    if (this.translationService.getCurrentLang() === "en") {
      this.currentLang.set("English");
    } else {
      this.currentLang.set("العربيه");
    }
  }

  ngOnInit(): void {
    this.setLanguage();
  }

  changeLang() {
    if (this.currentLang() === "English") {
      this.translationService.changeLang("ar");
      this.currentLang.set("العربيه");
    } else {
      this.translationService.changeLang("en");
      this.currentLang.set("English");
    }
  }
}

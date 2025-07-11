import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslationService } from "@rose/core_services/translation/translation.service";
@Component({
  selector: "app-translate-toggle",
  imports: [NgOptimizedImage],
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

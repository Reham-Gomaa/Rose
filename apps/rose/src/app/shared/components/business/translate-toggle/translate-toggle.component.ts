import { fadeTransition } from './../../../../core/services/translation/fade.animation';
import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { TranslationService } from "./../../../../core/services/translation/translation.service";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: "app-translate-toggle",
  imports: [ TranslatePipe ],
  templateUrl: "./translate-toggle.component.html",
  styleUrl: "./translate-toggle.component.scss",
   animations: [fadeTransition]
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

  //   this.translationService.fadeAnimation.set('hidden');
    
  //   setTimeout(() => {
  //     if (this.currentLang() === "English") {
  //       this.translationService.changeLang("ar");
  //       this.currentLang.set("العربيه");
  //     } else {
  //       this.translationService.changeLang("en");
  //       this.currentLang.set("English");
  //     }
  //     this.translationService.fadeAnimation.set('visible');
  // }, 500);

  }
}

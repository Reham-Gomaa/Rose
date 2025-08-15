import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
// shared Service
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Primeng
import { MenuItem, MessageService } from "primeng/api";
import { SpeedDialModule } from "primeng/speeddial";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-speed-dial",
  imports: [SpeedDialModule, ToastModule],
  templateUrl: "./speedDial.component.html",
  styleUrl: "./speedDial.component.scss",
  providers: [MessageService],
})
export class SpeedDialComponent implements OnInit {
  private messageService = inject(MessageService);
  private pLATFORM_ID = inject(PLATFORM_ID);
  private translationService = inject(TranslationService);
  private darkModeService = inject(DarkModeService);

  items: MenuItem[] | undefined;
  currentLang: WritableSignal<string> = signal("");

  setLanguage() {
    if (this.translationService.getCurrentLang() === "en") {
      this.currentLang.set("English");
    } else {
      this.currentLang.set("العربيه");
    }
  }

  ngOnInit() {
    this.setLanguage();
    this.items = [
      {
        icon: "pi pi-angle-double-up",
        command: () => {
          if (!isPlatformBrowser(this.pLATFORM_ID)) return;
          document.body.scrollTo({ top: 0, behavior: "smooth" });
        },
      },
      {
        icon: "pi pi-globe",
        command: () => {
          this.changeLang();
        },
      },
      {
        icon: "pi pi-moon",
        command: () => {
          this.darkModeService.toggle();
        },
      },
    ];
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

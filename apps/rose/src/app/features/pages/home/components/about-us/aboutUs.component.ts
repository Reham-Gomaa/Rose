import { Component, inject } from "@angular/core";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Services
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";
// Shared_services
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
//PrimeNg
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: "app-about-us",
  imports: [
    ButtonModule,
    RippleModule,
    DividerModule,
    ButtonComponent,
    TranslatePipe,
    NgOptimizedImage,
  ],
  templateUrl: "./aboutUs.component.html",
  styleUrl: "./aboutUs.component.scss",
  animations: [fadeTransition],
})
export class AboutUsComponent {
  public darkMode = inject(DarkModeService);
  translationService = inject(TranslationService);

  items = [
    "home.aboutUs.items.item1",
    "home.aboutUs.items.item2",
    "home.aboutUs.items.item3",
    "home.aboutUs.items.item4",
  ];
}

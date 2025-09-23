import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Animations
import { fadeTransition } from "@angular-monorepo/services";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
//PrimeNg
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { RippleModule } from "primeng/ripple";
import { TranslationService } from "@angular-monorepo/services";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[@fadeTransition]": "translationService.fadeState()",
  },
})
export class AboutUsComponent {
  translationService = inject(TranslationService);

  items = [
    "home.aboutUs.items.item1",
    "home.aboutUs.items.item2",
    "home.aboutUs.items.item3",
    "home.aboutUs.items.item4",
  ];
}

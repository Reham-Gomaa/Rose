import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";

@Component({
  selector: "app-best-seller",
  imports: [ButtonComponent, TranslatePipe, BestsellerSliderComponent],
  templateUrl: "./bestSeller.component.html",
  styleUrls: ["./bestSeller.component.scss"],
  animations: [fadeTransition],
})
export class BestSellerComponent {
  translationService = inject(TranslationService);

  responsiveOptions = [
    { breakpoint: "74.9375rem", numVisible: 2, numScroll: 1 },
    { breakpoint: "48rem", numVisible: 1, numScroll: 1 },
  ];
}

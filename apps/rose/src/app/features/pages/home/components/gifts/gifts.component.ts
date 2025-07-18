import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Interfaces
import {
  carouselListInterface,
  picsInterface,
  responsiveOptionsInterface,
} from "@rose/core_interfaces/special-gifts.interface";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// primeNg ...
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { TagModule } from "primeng/tag";

@Component({
  selector: "app-gifts",
  imports: [CarouselModule, ButtonModule, TagModule, ButtonComponent, TranslatePipe],
  templateUrl: "./gifts.component.html",
  styleUrl: "./gifts.component.scss",
  host: { ngSkipHydration: "true" },
  animations: [fadeTransition],
})
export class GiftsComponent {
  translationService = inject(TranslationService);

  carouselList: carouselListInterface[] = [
    {
      id: 1,
      source: "./images/gifts/1.WebP",
      title: "pink roses in white vase with white and pink balloons",
    },
    {
      id: 2,
      source: "./images/gifts/2$.WebP",
      title: "pink roses with box of chocolate",
    }
  ];

  pics: picsInterface[] = [
    {
      id: 1,
      source: "./images/gifts/Confetti lying near present.WebP",
      title: "christmas gift with red ribbon",
      heading2: "home.gifts.bottomImages.left.heading2",
      heading1: "home.gifts.bottomImages.left.heading1"
    },
    {
      id: 2,
      source: "./images/gifts/Top view hand holding gift box on work space.WebP",
      title: "christmas gift with golden ribbon",
      heading2: "home.gifts.bottomImages.middle.heading2",
      heading1: "home.gifts.bottomImages.middle.heading1",
    },
    {
      id: 3,
      source: "./images/gifts/Christmas shopping composition with presents and cart.WebP",
      title: "colorful christmas ribbons with shopping cart",
      heading2: "home.gifts.bottomImages.right.heading2",
      heading1: "home.gifts.bottomImages.right.heading1",
    },
  ];
}

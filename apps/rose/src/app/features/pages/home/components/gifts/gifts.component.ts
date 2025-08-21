import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Interfaces
import {
  carouselListInterface,
  picsInterface,
} from "@rose/core_interfaces/special-gifts.interface";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// primeNg ...
import { ButtonModule } from "primeng/button";
import { Carousel, CarouselModule } from "primeng/carousel";
import { TagModule } from "primeng/tag";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-gifts",
  imports: [CarouselModule, ButtonModule, TagModule, ButtonComponent, TranslatePipe],
  templateUrl: "./gifts.component.html",
  styleUrl: "./gifts.component.scss",
  host: {
    ngSkipHydration: "true",
    "[@fadeTransition]": "translationService.fadeState()",
  },
  animations: [fadeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftsComponent implements OnInit {
  translationService = inject(TranslationService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  @ViewChild("carousel") carousel!: Carousel;

  autoScrollInterval = 0;

  ngOnInit() {
    if (!isPlatformBrowser(this.pLATFORM_ID)) return;
    this.setAutoScroll(window.innerWidth);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.setAutoScroll(event.target.innerWidth);
  }

  private setAutoScroll(width: number) {
    if (width < 768) {
      this.autoScrollInterval = 3000;
    } else {
      this.autoScrollInterval = 0;
    }
  }

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
    },
  ];

  pics: picsInterface[] = [
    {
      id: 1,
      source: "./images/gifts/Confetti lying near present.WebP",
      title: "christmas gift with red ribbon",
      heading2: "home.gifts.bottomImages.left.heading2",
      heading1: "home.gifts.bottomImages.left.heading1",
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

  onNext() {
    (this.carousel as any).navForward();
  }

  onPrev() {
    (this.carousel as any).navBackward();
  }
}

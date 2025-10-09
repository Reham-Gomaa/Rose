import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/services";
// Animations
import { fadeTransition } from "@angular-monorepo/services";
// Interfaces
import {
  carouselListInterface,
  picsInterface,
} from "@rose/core_interfaces/special-gifts.interface";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// primeNg ...
import { isPlatformBrowser } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { Carousel, CarouselModule } from "primeng/carousel";
import { TagModule } from "primeng/tag";

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
  encapsulation: ViewEncapsulation.None,
})
export class GiftsComponent implements OnInit {
  translationService = inject(TranslationService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  @ViewChild("carousel") carousel!: Carousel;

  autoScrollInterval = signal(0);

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
      this.autoScrollInterval.set(3000);
    } else {
      this.autoScrollInterval.set(0);
    }
  }

  responsiveOptions = [
    {
      breakpoint: "87.5rem",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "48rem",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "35rem",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  carouselList: carouselListInterface[] = [
    {
      id: 1,
      source: "./images/gifts/1.AVIF",
      title: "pink roses in white vase with white and pink balloons",
    },
    {
      id: 2,
      source: "./images/gifts/2.AVIF",
      title: "pink roses with box of chocolate",
    },
  ];

  pics: picsInterface[] = [
    {
      id: 1,
      source: "./images/gifts/Confetti lying near present.AVIF",
      title: "christmas gift with red ribbon",
      heading2: "home.gifts.bottomImages.left.heading2",
      heading1: "home.gifts.bottomImages.left.heading1",
    },
    {
      id: 2,
      source: "./images/gifts/Top view hand holding gift box on work space.AVIF",
      title: "christmas gift with golden ribbon",
      heading2: "home.gifts.bottomImages.middle.heading2",
      heading1: "home.gifts.bottomImages.middle.heading1",
    },
    {
      id: 3,
      source: "./images/gifts/Christmas shopping composition with presents and cart.AVIF",
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

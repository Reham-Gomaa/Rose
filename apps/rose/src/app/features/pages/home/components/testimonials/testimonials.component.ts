import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
// Images
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/services";
// Animations
import { fadeTransition } from "@angular-monorepo/services";
// Interfaces
import { responsiveOption, Testimonials } from "@rose/core_interfaces/testimonials.interface";
// primeNg
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: "app-testimonials",
  imports: [CarouselModule, ButtonModule, TranslatePipe],
  templateUrl: "./testimonials.component.html",
  styleUrl: "./testimonials.component.scss",
  host: {
    ngSkipHydration: "true",
    "[@fadeTransition]": "translationService.fadeState()",
  },
  animations: [fadeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  translationService = inject(TranslationService);

  testimonials: Testimonials[] = [
    {
      source: "./images/testimonials/customer-1.AVIF",
      heading2: "home.testimonials.customer1.heading2",
      paragraph: "home.testimonials.customer1.paragraph",
      heading3: "home.testimonials.heading3",
    },
    {
      source: "./images/testimonials/customer-2.AVIF",
      heading2: "home.testimonials.customer2.heading2",
      paragraph: "home.testimonials.customer2.paragraph",
      heading3: "home.testimonials.heading3",
    },
    {
      source: "./images/testimonials/customer-3.AVIF",
      heading2: "home.testimonials.customer3.heading2",
      paragraph: "home.testimonials.customer3.paragraph",
      heading3: "home.testimonials.heading3",
    },
  ];

  responsiveOptions: responsiveOption[] | undefined = [
    {
      breakpoint: "75rem",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "62rem",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "47.9375rem",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "31.25rem",
      numVisible: 1,
      numScroll: 1,
    },
  ];
}

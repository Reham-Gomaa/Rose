import { Component, inject } from "@angular/core";
// Images
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
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
  host: { ngSkipHydration: "true" },
  animations: [fadeTransition],
})
export class TestimonialsComponent {
  translationService = inject(TranslationService);

  testimonials: Testimonials[] = [
    {
      source: "./images/testimonials/customer-1.WebP",
      heading2: "home.testimonials.customer1.heading2",
      paragraph: "home.testimonials.customer1.paragraph",
      heading3: "home.testimonials.heading3",
    },
    {
      source: "./images/testimonials/customer-2.WebP",
      heading2: "home.testimonials.customer2.heading2",
      paragraph: "home.testimonials.customer2.paragraph",
      heading3: "home.testimonials.heading3",
    },
    {
      source: "./images/testimonials/customer-3.WebP",
      heading2: "home.testimonials.customer3.heading2",
      paragraph: "home.testimonials.customer3.paragraph",
      heading3: "home.testimonials.heading3",
    },
  ];

  responsiveOptions: responsiveOption[] | undefined = [
    {
      breakpoint: "1200px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "992px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "500px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
}

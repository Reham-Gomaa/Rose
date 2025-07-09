import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Interfaces
import { responsiveOption, Testimonials } from "@rose/core_interfaces/testimonials.interface";
// primeNg
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-testimonials",
  imports: [CarouselModule, ButtonModule, TranslatePipe],
  templateUrl: "./testimonials.component.html",
  styleUrl: "./testimonials.component.scss",
  animations: [fadeTransition]
})
export class TestimonialsComponent {
  translationService = inject(TranslationService);

  testimonials: Testimonials[] = [
    {
      source: "./images/testimonials/T-1.WebP",
      heading2: "home.testimonials.customer1.heading2",
      heading3: "home.testimonials.customer1.heading3",
      paragraph: "home.testimonials.customer1.paragraph",
    },
    {
      source: "./images/testimonials/T-2.WebP",
      heading2: "home.testimonials.customer2.heading2",
      heading3: "home.testimonials.customer2.heading3",
      paragraph: "home.testimonials.customer2.paragraph",
    },
    {
      source: "./images/testimonials/T-3.WebP",
      heading2: "home.testimonials.customer3.heading2",
      heading3: "home.testimonials.customer3.heading3",
      paragraph: "home.testimonials.customer3.paragraph",
    },
    {
      source: "./images/testimonials/T-4.WebP",
      heading2: "home.testimonials.customer4.heading2",
      heading3: "home.testimonials.customer4.heading3",
      paragraph: "home.testimonials.customer4.paragraph",
    },
    {
      source: "./images/testimonials/T-1.WebP",
      heading2: "home.testimonials.customer5.heading2",
      heading3: "home.testimonials.customer5.heading3",
      paragraph: "home.testimonials.customer5.paragraph",
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

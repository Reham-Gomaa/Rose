import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Testimonials } from './../../../../../core/interfaces/testimonials.interface';
import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';

// primeNg imports ....
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testimonials',
  imports: [CarouselModule, ButtonModule, TranslatePipe],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  public darkMode = inject(DarkModeService);
  testimonials: Testimonials[] = [
    { source: "./images/testimonials/T-1.jpg", heading2: "home.testimonials.customer1.heading2", heading3: "home.testimonials.customer1.heading3", paragraph: "home.testimonials.customer1.paragraph" },
    { source: "./images/testimonials/T-2.jpg", heading2: "home.testimonials.customer2.heading2", heading3: "home.testimonials.customer2.heading3", paragraph: "home.testimonials.customer2.paragraph" },
    { source: "./images/testimonials/T-3.jpg", heading2: "home.testimonials.customer3.heading2", heading3: "home.testimonials.customer3.heading3", paragraph: "home.testimonials.customer3.paragraph" },
    { source: "./images/testimonials/T-4.jpg", heading2: "home.testimonials.customer4.heading2", heading3: "home.testimonials.customer4.heading3", paragraph: "home.testimonials.customer4.paragraph" },
    { source: "./images/testimonials/T-1.jpg", heading2: "home.testimonials.customer5.heading2", heading3: "home.testimonials.customer5.heading3", paragraph: "home.testimonials.customer5.paragraph" },
  ]

  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '500px',
      numVisible: 1,
      numScroll: 1
    },
  ];
}

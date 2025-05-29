import { Component } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testimonials',
  imports: [ CarouselModule, ButtonModule ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    responsiveOptions: any[] | undefined = [
    // {
    //   breakpoint: '1199px',
    //   numVisible: 2,
    //   numScroll: 1
    // },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 1
    }
  ];
}

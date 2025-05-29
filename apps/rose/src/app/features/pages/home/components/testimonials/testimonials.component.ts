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
  testimonials : any[] = [
    {source: "./images/T-1.jpg"},
    {source: "./images/T-2.jpg"},
    {source: "./images/T-3.jpg"},
    {source: "./images/T-4.jpg"},
    {source: "./images/T-1.jpg"},
    {source: "./images/T-2.jpg"},
    {source: "./images/T-3.jpg"},
    {source: "./images/T-4.jpg"}
  ]

    responsiveOptions: any[] | undefined = [
    // {
    //   breakpoint: '1199px',
    //   numVisible: 2,
    //   numScroll: 1
    // },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}

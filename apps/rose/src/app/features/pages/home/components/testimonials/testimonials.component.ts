import { Component } from '@angular/core';

// primeNg imports ....
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testimonials',
  imports: [ CarouselModule, ButtonModule ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  testimonials : string[] = [
    "./images/T-1.jpg",
    "./images/T-2.jpg",
    "./images/T-3.jpg",
    "./images/T-4.jpg",
    "./images/T-1.jpg",
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

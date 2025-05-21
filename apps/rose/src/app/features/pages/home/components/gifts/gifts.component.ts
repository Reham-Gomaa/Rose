import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-gifts',
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
})
export class GiftsComponent implements OnInit {

  carouselList: any = [
    { id: 1, source: "./images/1.jpeg", title: "gifts" },
    { id: 2, source: "./images/2.jpeg", title: "gifts" },
    { id: 3, source: "./images/3.jpeg", title: "gifts" },
    { id: 4, source: "./images/4.jpeg", title: "gifts" },
  ]
  pics: any = [
    { id: 1, source: "./images/Confetti lying near present.png", title: "red christmas gifts" },
    { id: 2, source: "./images/Top view hand holding gift box on work space.png", title: "red christmas gifts" },
    { id: 3, source: "./images/Christmas shopping composition with presents and cart.png", title: "red christmas gifts" },
  ]

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

}

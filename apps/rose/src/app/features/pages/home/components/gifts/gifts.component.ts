import { Component } from '@angular/core';
import { carouselListInterface, picsInterface, responsiveOptionsInterface } from '../../../../../core/interfaces/special-gifts.interface';
import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";

// primeNg ...
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-gifts',
  imports: [CarouselModule, ButtonModule, TagModule, ButtonComponent, TranslatePipe],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
})
export class GiftsComponent {
  carouselList: carouselListInterface[] = [
    { id: 1, source: "./images/gifts/1.jpeg", title: "pink roses in white vase with white and pink balloons" },
    { id: 2, source: "./images/gifts/2.jpeg", title: "christmas gift with gray ribbon and orange roses" },
    { id: 3, source: "./images/gifts/3.jpeg", title: "pink christmas gifts with pink ribbons" },
    { id: 4, source: "./images/gifts/4.jpeg", title: "christmas gift with red ribbon" },
  ]

  responsiveOptions: responsiveOptionsInterface[] | undefined = [
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  pics: picsInterface[] = [
    { id: 1, source: "./images/gifts/Confetti lying near present.png", title: "christmas gift with red ribbon", heading2: "home.gifts.bottomImages.left.heading2", heading1: "home.gifts.bottomImages.left.heading1", btnText: 'home.gifts.bottomImages.left.btn' },
    { id: 2, source: "./images/gifts/Top view hand holding gift box on work space.png", title: "christmas gift with golden ribbon", heading2: "home.gifts.bottomImages.middle.heading2", heading1: "home.gifts.bottomImages.middle.heading1", btnText: 'home.gifts.bottomImages.middle.btn' },
    { id: 3, source: "./images/gifts/Christmas shopping composition with presents and cart.png", title: "colorful christmas ribbons with shopping cart", heading2: "home.gifts.bottomImages.right.heading2", heading1: "home.gifts.bottomImages.right.heading1", btnText: 'home.gifts.bottomImages.right.btn' },
  ];
}

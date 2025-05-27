import { Component } from '@angular/core';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";
@Component({
  selector: 'app-about-us',
  imports: [ButtonModule, RippleModule, DividerModule, ButtonComponent],
  templateUrl: './aboutUs.component.html',
  styleUrl: './aboutUs.component.scss',
})
export class AboutUsComponent {
items = [
  "Streamlined Shipping Experience",
  "Affordable Modern Design",
  "Competitive Price & Easy To Shop",
  "We Made Awesome Products"
];
}

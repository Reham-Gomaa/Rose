import { Component } from '@angular/core';

//PrimeNg

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-about-us',
  imports: [ButtonModule, RippleModule, DividerModule],
  templateUrl: './aboutUs.component.html',
  styleUrl: './aboutUs.component.scss',
})
export class AboutUsComponent {

}

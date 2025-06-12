import { Component } from '@angular/core';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-about-us',
  imports: [ButtonModule, RippleModule, DividerModule, ButtonComponent, TranslatePipe],
  templateUrl: './aboutUs.component.html',
  styleUrl: './aboutUs.component.scss',
})
export class AboutUsComponent {
items = [
  "home.aboutUs.items.item1",
  "home.aboutUs.items.item2",
  "home.aboutUs.items.item3",
  "home.aboutUs.items.item4"
];
}

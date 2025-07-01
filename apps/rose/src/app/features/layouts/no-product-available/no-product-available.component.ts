import { Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-no-product-available',
  imports: [TranslatePipe],
  templateUrl: './no-product-available.component.html',
  styleUrl: './no-product-available.component.scss'
})
export class NoProductAvailableComponent {

}

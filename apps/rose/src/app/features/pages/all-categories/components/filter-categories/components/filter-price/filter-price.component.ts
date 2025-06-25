import { Component } from '@angular/core';
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-price',
  imports: [FilterCardComponent, TranslatePipe],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss'
})
export class FilterPriceComponent {

}

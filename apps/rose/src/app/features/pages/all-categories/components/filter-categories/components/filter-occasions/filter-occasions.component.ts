import { Component } from '@angular/core';
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { FilterItem, selectedItem } from '../../../../../../../core/interfaces/filter-item.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-occasions',
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: './filter-occasions.component.html',
  styleUrl: './filter-occasions.component.scss'
})
export class FilterOccasionsComponent {

  occasions: FilterItem[] = [
    { _id: '1-occasion', category: 'all-categories.filterOccasions.wedding', productCount: 5},
    { _id: '2-occasion', category: 'all-categories.filterOccasions.apology', productCount: 4},
    { _id: '3-occasion', category: 'all-categories.filterOccasions.graduation', productCount: 4},
    { _id: '4-occasion', category: 'all-categories.filterOccasions.anniversary', productCount: 1}
  ];

  selectedItems: selectedItem[] = [] as selectedItem[];

}

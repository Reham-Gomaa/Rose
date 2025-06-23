import { Component } from '@angular/core';
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { FilterItem, selectedItem } from '../../../../../../../core/interfaces/filter-item.interface';

@Component({
  selector: 'app-filter-occasions',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-occasions.component.html',
  styleUrl: './filter-occasions.component.scss'
})
export class FilterOccasionsComponent {

  occasions: FilterItem[] = [
    { _id: '1-occasion', category: 'Wedding', productCount: 5},
    { _id: '2-occasion', category: 'Apology', productCount: 4},
    { _id: '3-occasion', category: 'Graduation', productCount: 4},
    { _id: '4-occasion', category: 'Anniversary', productCount: 1}
  ];

  selectedItems: selectedItem[] = [] as selectedItem[];

}

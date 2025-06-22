import { Component } from '@angular/core';
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { staticFilterItem } from '../../../../../../../core/interfaces/filter-item.interface';

@Component({
  selector: 'app-filter-occasions',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-occasions.component.html',
  styleUrl: './filter-occasions.component.scss'
})
export class FilterOccasionsComponent {

  occasions: staticFilterItem[] = [
    { _id: '1-occasion', name: 'occasion', category: 'Wedding' },
    { _id: '2-occasion', name: 'occasion', category: 'Apology' },
    { _id: '3-occasion', name: 'occasion', category: 'Graduation' },
    { _id: '4-occasion', name: 'occasion', category: 'Anniversary' }
  ];

  selectedItems: string[] = [];

}

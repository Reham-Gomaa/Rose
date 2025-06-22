import { Component } from '@angular/core';
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { staticFilterItem } from './../../../../../../../core/interfaces/static-filter-item.interface';

@Component({
  selector: 'app-filter-brands',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-occasions.component.html',
  styleUrl: './filter-occasions.component.scss'
})
export class FilterBrandsComponent {

  occasions: staticFilterItem[] = [
    { _id: '1-brand', category: 'Wedding'},
    { _id: '2-brand', category: 'Apology'},
    { _id: '3-brand', category: 'Graduation'},
    { _id: '4-brand', category: 'Anniversary'}
  ];

  selectedItems: string[] = [];

}

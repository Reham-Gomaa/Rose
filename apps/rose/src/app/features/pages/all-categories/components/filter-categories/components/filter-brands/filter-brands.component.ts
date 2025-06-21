import { Component, signal } from '@angular/core';
import { CheckedCardComponent } from "../checkbox/checked-card.component";
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { staticFilterItem } from './../../../../../../../core/interfaces/static-filter-item.interface';

@Component({
  selector: 'app-filter-brands',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-brands.component.html',
  styleUrl: './filter-brands.component.scss'
})
export class FilterBrandsComponent {

  brands: staticFilterItem[] = [
    { _id: '1-brand', category: 'Wedding' },
    { _id: '2-brand', category: 'Apology' },
    { _id: '3-brand', category: 'Graduation' },
    { _id: '4-brand', category: 'Anniversary' }
  ];

  selectedItems :string[] = [];

}

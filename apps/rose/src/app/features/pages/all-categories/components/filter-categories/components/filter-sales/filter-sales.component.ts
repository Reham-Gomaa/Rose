import { Component } from '@angular/core';
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { staticFilterItem } from '../../../../../../../core/interfaces/filter-item.interface';

@Component({
  selector: 'app-filter-sales',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-sales.component.html',
  styleUrl: './filter-sales.component.scss'
})
export class FilterSalesComponent {
  sales: staticFilterItem[] = [
    { _id: '1-sales', name: 'sales', category: 'On Sale' },
    { _id: '2-sales', name: 'sales', category: 'In Stock' },
    { _id: '3-sales', name: 'sales', category: 'Out Of Stock' },
    { _id: '4-sales', name: 'sales', category: 'Discount' }
  ];

  selectedItems: string[] = [];

}

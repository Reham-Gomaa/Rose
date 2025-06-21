import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sorting',
  imports: [TranslatePipe],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {
  sortOptions = [
    {
      id: 'sort-low-high',
      value: 'price-asc',
      label: 'all-categories.cardSort.Price: Low to High',
      checked: false
    },
    {
      id: 'sort-high-low',
      value: 'price-desc',
      label: 'all-categories.cardSort.Price: High to Low',
      checked: false
    },
    {
      id: 'sort-a-z',
      value: 'alpha-asc',
      label: 'all-categories.cardSort.Alphabetical: A-Z',
      checked: false
    },
    {
      id: 'sort-z-a',
      value: 'alpha-desc',
      label: 'all-categories.cardSort.Alphabetical: Z-A',
      checked: false
    }
  ];

}

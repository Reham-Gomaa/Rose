import { Component, input, InputSignal } from '@angular/core';
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { staticFilterItem } from './../../../../../../../core/interfaces/static-filter-item.interface';

@Component({
  selector: 'app-filter-brands',
  imports: [FilterCardComponent],
  templateUrl: './filter-brands.component.html',
  styleUrl: './filter-brands.component.scss'
})
export class FilterBrandsComponent {
  brands: staticFilterItem[] = [
    { id: 1, name: 'Wedding' },
    { id: 2, name: 'Apology' },
    { id: 3, name: 'Graduation' },
    { id: 4, name: 'Anniversary' }
  ];
  selectedItems: InputSignal<number[]> = input([0]);

  isItemSelected(itemId: number): boolean {
    return this.selectedItems().includes(itemId);
  }

   toggleItemSelection(itemId: number): void {
    const current = [...this.selectedItems()];
    const index = current.indexOf(itemId);
    if (index === -1) {
      this.selectedItems().push(itemId);
    } else {
      this.selectedItems().splice(index, 1);
    }
  }
}

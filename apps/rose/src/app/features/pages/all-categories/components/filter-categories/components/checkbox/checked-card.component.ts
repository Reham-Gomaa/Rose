
import { Component, input, InputSignal } from '@angular/core';
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { CategoryProductCount } from './../../../../../../../core/interfaces/count-by-product.interface';
import { staticFilterItem } from './../../../../../../../core/interfaces/static-filter-item.interface';


type filterItemsType = staticFilterItem[] | CategoryProductCount[];
@Component({
  selector: 'app-checked-card',
  imports: [FilterCardComponent],
  templateUrl: './checked-card.component.html',
  styleUrl: './checked-card.component.scss',
})

export class CheckedCardComponent {
  filterItems: InputSignal<any> = input([]);
  selectedItems: InputSignal<string[]> = input(['']);

  //  @Input({ required: true }) filterItems!: InputSignal<filterItemsType>;
  // @Input({ required: true }) selectedItems!: InputSignal<string[]>;

  isItemSelected(itemId: string): boolean {
    return this.selectedItems().includes(itemId);
  }

   toggleItemSelection(itemId: string): void {
    const current = [...this.selectedItems()];
    const index = current.indexOf(itemId);
    if (index === -1) {
      this.selectedItems().push(itemId);
    } else {
      this.selectedItems().splice(index, 1);
    }
  }

}
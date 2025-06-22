
import { Component, input, InputSignal } from '@angular/core';
import { FilterItem } from '../../../../core/interfaces/filter-item.interface';


@Component({
  selector: 'app-checked-card',
  imports: [],
  templateUrl: './checked-card.component.html',
  styleUrl: './checked-card.component.scss',
})

export class CheckedCardComponent {
  filterItems: InputSignal<FilterItem[]> = input<FilterItem[]>([]);
  selectedItems: InputSignal<string[]> = input(['']);

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

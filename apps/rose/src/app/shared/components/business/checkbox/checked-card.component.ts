
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-checked-card',
  imports: [],
  templateUrl: './checked-card.component.html',
  styleUrl: './checked-card.component.scss',
})

export class CheckedCardComponent {
  filterItems: InputSignal<any> = input([]);
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

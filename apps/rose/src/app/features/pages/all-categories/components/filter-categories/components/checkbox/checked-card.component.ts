
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-checked-card',
  imports: [],
  templateUrl: './checked-card.component.html',
  styleUrl: './checked-card.component.scss',
})
export class CheckedCardComponent {
  filterItems: InputSignal<any> = input();
  selectedItems: InputSignal<number[]> = input([0]);

  isItemSelected(itemId: number): boolean {
    return this.selectedItems().includes(itemId);
  }

   toggleItemSelection(itemId: number): void {
    const current = [...this.selectedItems()];
    const index = current.indexOf(itemId);
    if (index === -1) {
      this.selectedItems().push(itemId);
      console.log(this.selectedItems())
    } else {
      this.selectedItems().splice(index, 1);
      console.log(this.selectedItems())
    }
  }

}
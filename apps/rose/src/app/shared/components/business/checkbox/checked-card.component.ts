import { Component, input, InputSignal } from "@angular/core";
import { FilterItem, selectedItem } from "../../../../core/interfaces/filter-item.interface";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-checked-card",
  imports: [TranslatePipe],
  templateUrl: "./checked-card.component.html",
  styleUrl: "./checked-card.component.scss",
})
export class CheckedCardComponent {
  filterItems: InputSignal<FilterItem[]> = input<FilterItem[]>([]);
  selectedItems: InputSignal<selectedItem[]> = input([] as selectedItem[]);
  itemType: InputSignal<string> = input("");

  isItemSelected(itemId: string): boolean {
    return this.selectedItems().some((item) => item._id === itemId);
  }

  toggleItemSelection(itemId: string): void {
    const current = [...this.selectedItems()];
    const index = current.findIndex((item) => item._id === itemId);
    if (index === -1) {
      this.selectedItems().push({ _id: itemId, type: this.itemType() });
    } else {
      this.selectedItems().splice(index, 1);
    }
  }
}

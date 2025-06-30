import { Component, input, InputSignal, Output, EventEmitter } from "@angular/core";
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

  @Output() selectedItemsChange = new EventEmitter<selectedItem[]>();

  isItemSelected(itemId: string): boolean {
    return this.selectedItems().some((item) => item._id === itemId);
  }

  toggleItemSelection(itemId: string, rateAvg ?:number): void {
    const current = [...this.selectedItems()];
    const index = current.findIndex((item) => item._id === itemId);
    let newSelected: selectedItem[];
    if (index === -1) {
      newSelected = [...current, { _id: itemId, type: this.itemType(), ...(this.itemType() === 'ratings' && { rateAvg: rateAvg ?? 0 })}];
    } else {
      newSelected = current.filter((item) => item._id !== itemId);
    }
    this.selectedItemsChange.emit(newSelected);
  }
}

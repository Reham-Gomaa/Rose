import { Component, input, InputSignal, signal } from '@angular/core';
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { CheckedCardComponent } from "../checkbox/checked-card.component";
import { staticFilterItem } from './../../../../../../../core/interfaces/static-filter-item.interface';

@Component({
  selector: 'app-filter-sales',
  imports: [FilterCardComponent, CheckedCardComponent],
  templateUrl: './filter-sales.component.html',
  styleUrl: './filter-sales.component.scss'
})
export class FilterSalesComponent {
  sales :staticFilterItem[] = [
    {id:1, name:'On Sale'},
     {id:2, name:'In Stock'}, 
     {id:3, name:'Out Of Stock'}, 
     {id:4, name:'Discount'}
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
      console.log(this.selectedItems())
    } else {
      this.selectedItems().splice(index, 1);
      console.log(this.selectedItems())
    }
  }
}

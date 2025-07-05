import { Component } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { FilterItem, selectedItem } from "@rose/core_interfaces/filter-item.interface";
// Shared_Components
import { CheckedCardComponent } from "@rose/shared_Components_business/checkbox/checked-card.component";
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";

@Component({
  selector: "app-filter-sales",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-sales.component.html",
  styleUrl: "./filter-sales.component.scss",
})
export class FilterSalesComponent {
  sales: FilterItem[] = [
    { _id: "1-sales", category: "all-categories.filterSales.On Sale" },
    { _id: "2-sales", category: "all-categories.filterSales.In Stock" },
    { _id: "3-sales", category: "all-categories.filterSales.Out Of Stock" },
    { _id: "4-sales", category: "all-categories.filterSales.Discount" },
  ];

  selectedItems: selectedItem[] = [] as selectedItem[];
}

import { Component } from "@angular/core";
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import {
  FilterItem,
  selectedItem,
} from "../../../../../../../core/interfaces/filter-item.interface";
import { TranslatePipe } from "@ngx-translate/core";

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

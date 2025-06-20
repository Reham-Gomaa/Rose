import { Component } from '@angular/core';
import { SortingComponent } from "./components/sorting/sorting.component";
import { InputBtnComponent } from "../../../../../shared/components/ui/input-btn/input-btn.component";
import { TranslatePipe } from '@ngx-translate/core';
import { FilterBrandsComponent } from "./components/filter-brands/filter-brands.component";
import { FilterPriceComponent } from "./components/filter-price/filter-price.component";
import { FilterSalesComponent } from "./components/filter-sales/filter-sales.component";
import { FilterRatingComponent } from "./components/filter-rating/filter-rating.component";

@Component({
  selector: 'app-filter-categories',
  imports: [SortingComponent, InputBtnComponent, TranslatePipe, FilterBrandsComponent, FilterPriceComponent, FilterSalesComponent, FilterRatingComponent],
  templateUrl: './filter-categories.component.html',
  styleUrl: './filter-categories.component.scss'
})
export class FilterCategoriesComponent {

}

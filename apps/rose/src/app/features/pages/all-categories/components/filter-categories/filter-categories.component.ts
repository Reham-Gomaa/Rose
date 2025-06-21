import { Component } from '@angular/core';
import { SortingComponent } from "./components/sorting/sorting.component";
import { InputBtnComponent } from "../../../../../shared/components/ui/input-btn/input-btn.component";
import { TranslatePipe } from '@ngx-translate/core';
import { FilterBrandsComponent } from "./components/filter-occasions/filter-occasions.component";
import { FilterPriceComponent } from "./components/filter-price/filter-price.component";
import { FilterSalesComponent } from "./components/filter-sales/filter-sales.component";
import { FilterRatingComponent } from "./components/filter-rating/filter-rating.component";
import { FilterCardComponent } from "../../../../../shared/components/ui/filter-card/filter-card.component";
import { FilterCategoryComponent } from "./components/filter-category/filter-category.component";
import { EnglishOnlyDirective } from '../../../../../core/directive/english-only.directive';

@Component({
  selector: 'app-filter-categories',
  imports: [EnglishOnlyDirective, SortingComponent, InputBtnComponent, TranslatePipe, FilterBrandsComponent, FilterPriceComponent, FilterSalesComponent, FilterRatingComponent, FilterCardComponent, FilterCategoryComponent],
  templateUrl: './filter-categories.component.html',
  styleUrl: './filter-categories.component.scss'
})
export class FilterCategoriesComponent {

}

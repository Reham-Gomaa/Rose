import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Directives
import { EnglishOnlyDirective } from "@rose/core_directive/english-only.directive";
// Components
import { SortingComponent } from "./components/sorting/sorting.component";
import { FilterOccasionsComponent } from "./components/filter-occasions/filter-occasions.component";
import { FilterPriceComponent } from "./components/filter-price/filter-price.component";
import { FilterSalesComponent } from "./components/filter-sales/filter-sales.component";
import { FilterRatingComponent } from "./components/filter-rating/filter-rating.component";
import { FilterCategoryComponent } from "./components/filter-category/filter-category.component";
// Shared_Components
import { InputBtnComponent } from "@rose/shared_Components_ui/input-btn/input-btn.component";
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
// NGRX
import { Store } from "@ngrx/store";
import { clearFilter, loadSelectedName } from "@rose/store_filter/filter.actions";

@Component({
  selector: "app-filter-categories",
  imports: [
    EnglishOnlyDirective,
    SortingComponent,
    InputBtnComponent,
    TranslatePipe,
    FilterOccasionsComponent,
    FilterPriceComponent,
    FilterSalesComponent,
    FilterRatingComponent,
    FilterCardComponent,
    FilterCategoryComponent,
  ],
  templateUrl: "./filter-categories.component.html",
  styleUrl: "./filter-categories.component.scss",
})
export class FilterCategoriesComponent {
  private readonly _store = inject(Store);

  filterByName(productName: string) {
    this._store.dispatch(loadSelectedName({ name: productName }));
  }

  clearFilterBtn() {
    this._store.dispatch(clearFilter());
  }
}

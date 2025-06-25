import { Component, inject } from "@angular/core";
import { SortingComponent } from "./components/sorting/sorting.component";
import { InputBtnComponent } from "../../../../../shared/components/ui/input-btn/input-btn.component";
import { TranslatePipe } from "@ngx-translate/core";
import { FilterOccasionsComponent } from "./components/filter-occasions/filter-occasions.component";
import { FilterPriceComponent } from "./components/filter-price/filter-price.component";
import { FilterSalesComponent } from "./components/filter-sales/filter-sales.component";
import { FilterRatingComponent } from "./components/filter-rating/filter-rating.component";
import { FilterCardComponent } from "../../../../../shared/components/ui/filter-card/filter-card.component";
import { FilterCategoryComponent } from "./components/filter-category/filter-category.component";
import { EnglishOnlyDirective } from "../../../../../core/directive/english-only.directive";
import { Store } from "@ngrx/store";
import { ApplyFilters, clearFilter, loadSelectedName } from "apps/rose/src/app/store/filter/filter.actions";

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

  filterByName(productName:string){
    this._store.dispatch(loadSelectedName({name:productName}))
    this._store.dispatch(ApplyFilters());
  }


  
  clearFilterBtn(){
    this._store.dispatch(clearFilter())
  }

}

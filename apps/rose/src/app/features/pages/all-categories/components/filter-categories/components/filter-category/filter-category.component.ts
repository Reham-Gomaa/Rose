import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { ProductsService } from "../../../../../../../shared/services/products/products.service";
import { CategoryProductCount } from "../../../../../../../core/interfaces/count-by-product.interface";
import { selectedItem } from "./../../../../../../../core/interfaces/filter-item.interface";
import { TranslatePipe } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { ApplyFilters, loadSelectedCategories } from "apps/rose/src/app/store/filter/filter.actions";

@Component({
  selector: "app-filter-category",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-category.component.html",
  styleUrl: "./filter-category.component.scss",
})
export class FilterCategoryComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);;
  

  categories!: CategoryProductCount[];
  categoriesID!: Subscription;

  ngOnInit(): void {
    this.categoriesID = this._productsService.getcategoryProductCount().subscribe({
      next: (res) => {
        this.categories = res.categoryProductCount;
      },
    });
  }

  selectedItems: selectedItem[] = [] as selectedItem[];

  changeValue(){
  
    this._store.dispatch(loadSelectedCategories({selectedCategories:this.selectedItems}));
  }
  ngOnDestroy(): void {
    this.categoriesID?.unsubscribe();
  }
}

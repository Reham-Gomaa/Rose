import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// NGRX
import { Store } from "@ngrx/store";
import { loadSelectedCategories } from "@rose/store_filter/filter.actions";
// Interfaces
import { CategoryProductCount } from "@rose/core_interfaces/count-by-product.interface";
import { selectedItem } from "@rose/core_interfaces/filter-item.interface";
// Shared_Components
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
import { CheckedCardComponent } from "@rose/shared_Components_business/checkbox/checked-card.component";
// Shared_Services
import { ProductsService } from "@rose/shared_services/products/products.service";

@Component({
  selector: "app-filter-category",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-category.component.html",
  styleUrl: "./filter-category.component.scss",
})
export class FilterCategoryComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);

  private destroyRef = inject(DestroyRef);

  categories!: CategoryProductCount[];

  ngOnInit(): void {
    this._productsService
      .getcategoryProductCount()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.categories = res.categoryProductCount.filter((category) => category.category);
        },
      });
  }

  selectedItems: selectedItem[] = [] as selectedItem[];

  changeValue() {
    this._store.dispatch(loadSelectedCategories({ selectedCategories: this.selectedItems }));
  }
}

import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { TranslatePipe } from "@ngx-translate/core";

import { Store } from "@ngrx/store";
import { loadSelectedCategories } from './../../../../../../../store/filter/filter.actions';

import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { ProductsService } from "../../../../../../../shared/services/products/products.service";

import { CategoryProductCount } from "../../../../../../../core/interfaces/count-by-product.interface";
import { selectedItem } from "./../../../../../../../core/interfaces/filter-item.interface";

@Component({
  selector: "app-filter-category",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-category.component.html",
  styleUrl: "./filter-category.component.scss",
})
export class FilterCategoryComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);;

  private destroyRef = inject(DestroyRef);

  categories!: CategoryProductCount[];

  ngOnInit(): void {
      this._productsService.getcategoryProductCount().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categories = res.categoryProductCount.filter((category)=> category.category);
      },
    });
  }

  selectedItems: selectedItem[] = [] as selectedItem[];

  changeValue(){

    this._store.dispatch(loadSelectedCategories({selectedCategories:this.selectedItems}));
  }
}

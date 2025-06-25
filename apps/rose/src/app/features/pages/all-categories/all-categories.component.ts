import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { ProductsService } from "../../../shared/services/products/products.service";
import { Product } from "../../../core/interfaces/carditem.interface";
import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";
import { FilterCategoriesComponent } from "./components/filter-categories/filter-categories.component";
import { TranslatePipe } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { ButtonModule } from "primeng/button";
import { DrawerModule } from "primeng/drawer";
import { Store } from "@ngrx/store";
import * as sortActions from "../../../store/sort/sort.actions";
import * as sortSelectors from "../../../store/sort/store.selectors";
import { ApplyFilters, loadProductsToFilter } from "../../../store/filter/filter.actions";
import { selectFilterProducts } from "../../../store/filter/filter.selector";

@Component({
  selector: "app-all-categories",
  imports: [
    CardItemComponent,
    TranslatePipe,
    FilterCategoriesComponent,
    ButtonModule,
    DrawerModule,
  ],
  templateUrl: "./all-categories.component.html",
  styleUrl: "./all-categories.component.scss",
})
export class AllCategoriesComponent implements OnInit, OnDestroy {
  filterDrawerVisible = false;

  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);

  products = signal<Product[]>([]);
  loading = signal(true);
  private productSub: Subscription = new Subscription();

  ngOnInit() {
    this.loadProducts();

    

    this._store.select(selectFilterProducts).subscribe({
      next: (filterProducts) => {
        this.products.set(filterProducts);
      },
    });
  }

  private loadProducts() {
    this.loading.set(true);
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.products || []);
        this.loading.set(false);
        this.loadStores()
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private loadStores() {
    this._store.dispatch(sortActions.loadProducts({products: this.products(),}));
    this._store.select(sortSelectors.sortedProducts).subscribe({
      next: (sortProducts) => {
        this._store.dispatch(loadProductsToFilter({ products: sortProducts }));
        this._store.dispatch(ApplyFilters());
      },
    });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}

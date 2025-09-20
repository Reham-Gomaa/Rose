import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Animations
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/translation";
// Animations_Translation
import { fadeTransition } from "@rose/core_services/fade-out-animation/fade.animation";
// Interfaces
import { Product } from "@angular-monorepo/products";
// Components
import { FilterCategoriesComponent } from "./components/filter-categories/filter-categories.component";
// Shared_Components
import { NoDataAvailableComponent } from "@rose/shared_Components_business/no-data-available/no-data-available.component";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
// Shared_Services
import { ProductsService } from "@angular-monorepo/products";
//NGRX
import { Store } from "@ngrx/store";
import { loadProductsToFilter } from "@rose/store_filter/filter.actions";
import { selectFilterProducts } from "@rose/store_filter/filter.selector";
import * as sortActions from "@rose/store_sort/sort.actions";
import * as sortSelectors from "@rose/store_sort/store.selectors";
// primeng
import { ButtonModule } from "primeng/button";
import { DrawerModule } from "primeng/drawer";

@Component({
  selector: "app-all-categories",
  imports: [
    CardItemComponent,
    TranslatePipe,
    FilterCategoriesComponent,
    ButtonModule,
    DrawerModule,
    NoDataAvailableComponent,
    NoDataAvailableComponent,
  ],
  templateUrl: "./all-categories.component.html",
  styleUrl: "./all-categories.component.scss",
  animations: [
    trigger("gridAnimation", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "scale(0.95)" }),
            stagger(100, [animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    [fadeTransition],
  ],
})
export class AllCategoriesComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  readonly translationService = inject(TranslationService);
  private readonly _store = inject(Store);

  filterDrawerVisible = false;
  showGridToggle = true;

  products = signal<Product[]>([]);
  loading = signal(true);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadProducts();

    this._store
      .select(selectFilterProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (filterProducts) => {
          this.products.set(filterProducts);
          this.triggerGridAnimation();
        },
      });
  }

  triggerGridAnimation() {
    this.showGridToggle = false;
    setTimeout(() => (this.showGridToggle = true), 0);
  }

  addProductsToStore() {
    this._store.dispatch(
      sortActions.loadProducts({
        products: this.products(),
      }),
    );
  }

  private loadProducts() {
    this.loading.set(true);
    this._productsService
      .getAllProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.products.set(res.products || []);
          this.loading.set(false);
          this.loadStores();
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  private loadStores() {
    this._store.dispatch(sortActions.loadProducts({ products: this.products() }));
    this._store
      .select(sortSelectors.sortedProducts)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sortProducts) => {
          this._store.dispatch(loadProductsToFilter({ products: sortProducts }));
        },
      });
  }
}

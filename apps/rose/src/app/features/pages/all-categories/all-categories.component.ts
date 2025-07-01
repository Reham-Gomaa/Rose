import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { TranslatePipe } from "@ngx-translate/core";

import { Product } from "../../../core/interfaces/carditem.interface";

import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";
import { ProductsService } from "../../../shared/services/products/products.service";

import { Store } from "@ngrx/store";
import { loadProductsToFilter } from "../../../store/filter/filter.actions";
import { selectFilterProducts } from "../../../store/filter/filter.selector";
import * as sortActions from "../../../store/sort/sort.actions";
import * as sortSelectors from "../../../store/sort/store.selectors";

import { FilterCategoriesComponent } from "./components/filter-categories/filter-categories.component";

// primeng
import { ButtonModule } from "primeng/button";
import { DrawerModule } from "primeng/drawer";

import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { NoProductAvailableComponent } from "../../layouts/no-product-available/no-product-available.component";



@Component({
  selector: "app-all-categories",
  imports: [
    CardItemComponent,
    TranslatePipe,
    FilterCategoriesComponent,
    ButtonModule,
    DrawerModule,
    NoProductAvailableComponent
],
  templateUrl: "./all-categories.component.html",
  styleUrl: "./all-categories.component.scss",
   animations: [
    trigger('gridAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AllCategoriesComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);

  filterDrawerVisible = false;
  showGridToggle = true;


  products = signal<Product[]>([]);
  loading = signal(true);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadProducts();



    this._store.select(selectFilterProducts).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (filterProducts) => {
        this.products.set(filterProducts);
        this.triggerGridAnimation();
      },
    });


  }

  triggerGridAnimation() {
  this.showGridToggle = false;
  setTimeout(() => this.showGridToggle = true, 0);
 }

  addProductsToStore() {
    this._store.dispatch(
      sortActions.loadProducts({
        products: this.products(),
      })
    );
  }

  private loadProducts() {
    this.loading.set(true);
    this._productsService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
    this._store.dispatch(sortActions.loadProducts({products: this.products()}));
    this._store.select(sortSelectors.sortedProducts).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (sortProducts) => {
        this._store.dispatch(loadProductsToFilter({ products: sortProducts }));
      },
    });
  }
}

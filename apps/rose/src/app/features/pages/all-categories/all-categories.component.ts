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
import * as sortActions from "../../../store/sort/sort.actions"
import * as sortSelectors from "../../../store/sort/store.selectors"

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
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);

  filterDrawerVisible = false;



  products = signal<Product[]>([]);
  loading = signal(true);
  private productSub: Subscription = new Subscription();

  ngOnInit() {
    this.loadProducts();

    this._store.select(sortSelectors.sortedProducts).subscribe({
      next: (products) =>{
        this.products.set(products)
        console.log(this.products());
      }
    })
  }

  addProductsToStore(){
    this._store.dispatch(sortActions.loadProducts({
      products:this.products()
    }))
  }

  private loadProducts() {
    this.loading.set(true);
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.products || []);
        this.loading.set(false);
        this.addProductsToStore()

      },
      error: () => {
        this.loading.set(false);
      },
    });
  }



  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}

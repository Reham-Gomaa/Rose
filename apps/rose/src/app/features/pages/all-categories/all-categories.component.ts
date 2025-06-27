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
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
export class AllCategoriesComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _store = inject(Store);

  filterDrawerVisible = false;
  showGridToggle = true; // This will be used to trigger the animation


  products = signal<Product[]>([]);
  loading = signal(true);
  private productSub: Subscription = new Subscription();

  ngOnInit() {
    this.loadProducts();

    this._store.select(sortSelectors.sortedProducts).subscribe({
      next: (products) =>{
        this.products.set(products)
        console.log(this.products());
        this.triggerGridAnimation(); // Trigger the animation when products are updated
      }
    })
  }

  triggerGridAnimation() { // This method is called to trigger the animation
  this.showGridToggle = false;
  setTimeout(() => this.showGridToggle = true, 0);
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

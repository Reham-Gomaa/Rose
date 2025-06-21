import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../core/interfaces/carditem.interface';
import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";
import { FilterCategoriesComponent } from "./components/filter-categories/filter-categories.component";
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-all-categories',
  imports: [CardItemComponent, TranslatePipe, FilterCategoriesComponent, ButtonModule, DrawerModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
})
export class AllCategoriesComponent implements OnInit, OnDestroy {

  filterDrawerVisible = false;

  private readonly _productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  private productSub: Subscription = new Subscription();

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.loading.set(true);
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.products || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}

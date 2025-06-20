import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../core/interfaces/carditem.interface';
import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";
import { FilterCategoriesComponent } from "./components/filter-categories/filter-categories.component";
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-all-categories',
  imports: [CardItemComponent, TranslatePipe, FilterCategoriesComponent],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
})
export class AllCategoriesComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);

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
}

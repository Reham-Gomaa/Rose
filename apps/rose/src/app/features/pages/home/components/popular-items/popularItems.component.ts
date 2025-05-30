import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription, timer, take } from 'rxjs';
import { ProductsService } from '../../../../../shared/services/products/products.service';
import { Product } from '../../../../../core/interfaces/carditem.interface';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { CategoryOption } from '../../../../../core/interfaces/categories.interface';
import { CardItemComponent } from "../../../../../shared/components/ui/card-item/card-item.component";
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-items',
  standalone: true,
  imports: [CommonModule, CardItemComponent, SkeletonModule],
  templateUrl: './popularItems.component.html',
  styleUrl: './popularItems.component.scss',
})
export class PopularItemsComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);

  // Signal-based state
  allProducts = signal<Product[]>([]);
  categories = signal<CategoryOption[]>([]);
  selectedCategory = signal('all');
  showSkeleton = signal(true);
  loading = signal(true);
  skeletonItems = signal(Array(6).fill(0));

  private productSub: Subscription = new Subscription();
  private categorySub: Subscription = new Subscription();

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading.set(true);
    this.showSkeleton.set(true);

    // Start a 3-second timer (matches your existing code)
    const minLoadingTimer = timer(3000).pipe(take(1));

    this.getAllCategories();
    this.getAllProduct(minLoadingTimer);
  }

  private getAllCategories() {
    this.categorySub.add(
      this._categoriesService.getAllCategories().subscribe({
        next: (res) => {
          this.categories.set([
            { label: 'all', display: 'All Items', id: 'all' },
            ...res.categories.map(cat => ({
              label: cat.slug,
              display: cat.name,
              id: cat._id
            }))
          ]);
        },
        error: () => {
          this.loading.set(false);
        }
      })
    );
  }

  private getAllProduct(minLoadingTimer: any) {
    this.productSub.add(
      this._productsService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts.set(res.products || []);
          this.loading.set(false);

          minLoadingTimer.subscribe(() => {
            this.showSkeleton.set(false);
          });
        },
        error: () => {
          this.loading.set(false);
          minLoadingTimer.subscribe(() => {
            this.showSkeleton.set(false);
          });
        }
      })
    );
  }

  get filteredCards(): Product[] {
    if (this.selectedCategory() === 'all') {
      return this.allProducts();
    }
    return this.allProducts().filter(
      product => product.category === this.selectedCategory()
    );
  }

  selectCategory(categoryId: string) {
    if (!this.loading()) {
      this.selectedCategory.set(categoryId);
    }
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.categorySub.unsubscribe();
  }
}

import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, transition, query, style, animate, stagger } from '@angular/animations';

import { ProductsService } from "../../../../../shared/services/products/products.service";
import { Product } from "../../../../../core/interfaces/carditem.interface";
import { CategoriesService } from "../../../../../shared/services/categories/categories.service";
import { CategoryOption } from "../../../../../core/interfaces/categories.interface";

//Shared
import { CardItemComponent } from "../../../../../shared/components/ui/card-item/card-item.component";
//PrimeNg
import { SkeletonModule } from "primeng/skeleton";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-popular-items",
  imports: [CardItemComponent, SkeletonModule, TranslatePipe],
  templateUrl: './popularItems.component.html',
  styleUrl: './popularItems.component.scss',
    animations: [
      trigger('gridFade', [
    transition('* => *', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('300ms ease-out', style({ opacity: 1,  transform: 'translateY(0)' }))
    ])
  ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),

      ])
    ])
  ]
})
export class PopularItemsComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);

  allProducts = signal<Product[]>([]);
  categories = signal<CategoryOption[]>([]);
  selectedCategory = signal("all");
  loading = signal(true);
  skeletonItems = signal(Array(6).fill(0));
  

  private productSub: Subscription = new Subscription();
  private categorySub: Subscription = new Subscription();

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading.set(true);
    this.getAllCategories();
    this.getAllProduct();
  }

  private getAllCategories() {
    this.categorySub.add(
      this._categoriesService.getAllCategories().subscribe({
        next: (res) => {
          this.categories.set([
            { label: "all", display: "All Items", id: "all" },
            ...res.categories.map((cat) => ({
              label: cat.slug,
              display: cat.name,
              id: cat._id,
            })),
          ]);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  private getAllProduct() {
    this.productSub.add(
      this._productsService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts.set(res.products || []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  get filteredCards(): Product[] {
    if (this.selectedCategory() === "all") {
      return this.allProducts();
    }
    return this.allProducts().filter((product) => product.category === this.selectedCategory());
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

import { fadeTransition } from './../../../../../core/services/translation/fade.animation';
import { TranslationService } from './../../../../../core/services/translation/translation.service';
import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslatePipe } from "@ngx-translate/core";

import { trigger, transition, query, style, animate, stagger } from '@angular/animations';

import { ProductsService } from "../../../../../shared/services/products/products.service";
import { CategoriesService } from "../../../../../shared/services/categories/categories.service";

import { Product } from "../../../../../core/interfaces/carditem.interface";
import { CategoryOption } from "../../../../../core/interfaces/categories.interface";

//Shared
import { CardItemComponent } from "../../../../../shared/components/ui/card-item/card-item.component";
//PrimeNg
import { SkeletonModule } from "primeng/skeleton";
import { NoDataAvailableComponent } from "../../../../../shared/components/business/no-data-available/no-data-available.component";

@Component({
  selector: "app-popular-items",
  imports: [CardItemComponent, SkeletonModule, TranslatePipe, NoDataAvailableComponent],
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
    ]),
    [fadeTransition]
  ]
})
export class PopularItemsComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  translationService = inject(TranslationService);

  allProducts = signal<Product[]>([]);
  categories = signal<CategoryOption[]>([]);
  selectedCategory = signal("all");
  loading = signal(true);
  skeletonItems = signal(Array(6).fill(0));


  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loading.set(true);
    this.getAllCategories();
    this.getAllProduct();
  }

  private getAllCategories() {
      this._categoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
  }

  private getAllProduct() {

      this._productsService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.allProducts.set(res.products || []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
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
}

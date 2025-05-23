import { Component, inject } from '@angular/core';
import { CardItemComponent } from "../../../../../shared/components/ui/card-item/card-item.component";
import { Product } from '../../../../../core/interfaces/carditem.interface';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../../shared/services/products/products.service';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-items',
  imports: [CardItemComponent, CommonModule],
  templateUrl: './popularItems.component.html',
  styleUrl: './popularItems.component.scss',
})
export class PopularItemsComponent {

  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);

  allProducts: Product[] = [];
  categories: any[] = [];
  selectedCategory = 'all';
  productSub: Subscription = new Subscription();
  categorySub: Subscription = new Subscription();

  ngOnInit() {
    this.getAllCategories();
    this.getAllProduct();
  }

  getAllCategories() {
    this.categorySub.add(
      this._categoriesService.getAllCategories().subscribe({
        next: (res) => {
          // Transform categories to match your existing structure
          this.categories = [
            { label: 'all', display: 'All Items', id: 'all' },
            ...res.categories.map(cat => ({
              label: cat.slug,
              display: cat.name,
              id: cat._id
            }))
          ];
        }
      })
    );
  }

  getAllProduct() {
    this.productSub.add(
      this._productsService.getAllProducts().subscribe({
        next: (res) => {
          this.allProducts = res.products || [];
        },
      })
    );
  }

  get filteredCards(): Product[] {
    if (this.selectedCategory === 'all') {
      return this.allProducts;
    }
    return this.allProducts.filter(
      product => product.category === this.selectedCategory
    );
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.categorySub.unsubscribe();
  }
}

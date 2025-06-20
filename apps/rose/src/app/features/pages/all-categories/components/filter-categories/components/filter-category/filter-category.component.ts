import { Component, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { CategoryProductCount } from './../../../../../../../core/interfaces/count-by-product.interface';
import { CountByCategoryService } from './../../../../../../../shared/services/count_by_category/count-by-category.service';

@Component({
  selector: 'app-filter-category',
  imports: [FilterCardComponent],
  templateUrl: './filter-category.component.html',
  styleUrl: './filter-category.component.scss'
})
export class FilterCategoryComponent implements OnInit, OnDestroy{
  private readonly countByCategoryService = inject(CountByCategoryService);

  categories !:CategoryProductCount[];
  categoriesID !: Subscription;

  ngOnInit(): void {
    this.categoriesID = this.countByCategoryService.getcategoryProductCount().subscribe({
      next:(res)=>{
        this.categories = res.categoryProductCount
      }
    })
  }

  //filterItems: InputSignal<any> = input();
  selectedItems: InputSignal<string[]> = input(['']);

  isItemSelected(itemId: string): boolean {
    return this.selectedItems().includes(itemId);
  }

   toggleItemSelection(itemId: string): void {
    const current = [...this.selectedItems()];
    const index = current.indexOf(itemId);
    if (index === -1) {
      this.selectedItems().push(itemId);
    } else {
      this.selectedItems().splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.categoriesID?.unsubscribe();
  }

}


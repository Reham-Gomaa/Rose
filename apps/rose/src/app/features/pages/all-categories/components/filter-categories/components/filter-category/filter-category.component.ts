import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckedCardComponent } from "../checkbox/checked-card.component";
import { FilterCardComponent } from "../filter-card/filter-card.component";
import { CategoryProductCount } from './../../../../../../../core/interfaces/count-by-product.interface';
import { CountByCategoryService } from './../../../../../../../shared/services/count_by_category/count-by-category.service';

@Component({
  selector: 'app-filter-category',
  imports: [FilterCardComponent, CheckedCardComponent],
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
        this.categories = res.categoryProductCount;
        console.log(this.categories)
      }
    })
  }

  selectedItems :string[] = [];

  ngOnDestroy(): void {
    this.categoriesID?.unsubscribe();
  }

}


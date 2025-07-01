import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { TranslatePipe } from "@ngx-translate/core";

import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import {
  FilterItem,
  selectedItem,
} from "../../../../../../../core/interfaces/filter-item.interface";

import { occasionRes } from "../../../../../../../core/interfaces/occasions.interface";
import { OccasionsService } from "../../../../../../../shared/services/occasions/occasions.service";

import { Store } from "@ngrx/store";
import { loadSelectedOccasions } from './../../../../../../../store/filter/filter.actions';

@Component({
  selector: "app-filter-occasions",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-occasions.component.html",
  styleUrl: "./filter-occasions.component.scss",
})
export class FilterOccasionsComponent implements OnInit {
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _store = inject(Store);

  private destroyRef = inject(DestroyRef);

  occasions!: FilterItem[];

  selectedItems: selectedItem[] = [] as selectedItem[];

  ngOnInit(): void {
     this._occasionsService.getcategoryOccasions().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: occasionRes) => {

        this.occasions = res.occasions
          .filter((occasion) => occasion.productsCount > 0)
          .map((occasion) => ({
            _id: occasion._id,
            category: occasion.name,
            productCount: occasion.productsCount,
          }));
      },
      error: (err) => {
        console.error("Error fetching occasions:", err);
      },
    });
  }

  changeValue() {
    this._store.dispatch(loadSelectedOccasions({selectedOccasions:this.selectedItems}));
  }
}

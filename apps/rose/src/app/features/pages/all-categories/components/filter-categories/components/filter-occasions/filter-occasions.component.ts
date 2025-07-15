import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { FilterItem, selectedItem } from "@rose/core_interfaces/filter-item.interface";
import { occasionRes } from "@rose/core_interfaces/occasions.interface";
// Shared_Components
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
import { CheckedCardComponent } from "@rose/shared_Components_business/checkbox/checked-card.component";
// Shared_Services
import { OccasionsService } from "@rose/shared_services/occasions/occasions.service";
// NGRX
import { Store } from "@ngrx/store";
import { loadSelectedOccasions } from "@rose/store_filter/filter.actions";

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
    this._occasionsService
      .getcategoryOccasions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
    this._store.dispatch(loadSelectedOccasions({ selectedOccasions: this.selectedItems }));
  }
}

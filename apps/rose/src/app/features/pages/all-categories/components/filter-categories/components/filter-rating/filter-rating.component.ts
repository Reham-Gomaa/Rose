import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { FilterItem, selectedItem } from "@rose/core_interfaces/filter-item.interface";
// Shared_Components
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
import { CheckedCardComponent } from "@rose/shared_Components_business/checkbox/checked-card.component";
// NGRX
import { Store } from "@ngrx/store";
import { loadSelectedRating } from "@rose/store_filter/filter.actions";

@Component({
  selector: "app-filter-rating",
  imports: [FilterCardComponent, TranslatePipe, CheckedCardComponent],
  templateUrl: "./filter-rating.component.html",
  styleUrl: "./filter-rating.component.scss",
})
export class FilterRatingComponent {
  private readonly _store = inject(Store);

  ratings: FilterItem[] = [
    { _id: "1-ratings", rating: 5 },
    { _id: "2-ratings", rating: 4 },
    { _id: "3-ratings", rating: 3 },
    { _id: "4-ratings", rating: 2 },
    { _id: "5-ratings", rating: 1 },
  ];

  selectedItems: selectedItem[] = [] as selectedItem[];
  changeValue() {
    this._store.dispatch(loadSelectedRating({ selectedRating: this.selectedItems }));
  }
}

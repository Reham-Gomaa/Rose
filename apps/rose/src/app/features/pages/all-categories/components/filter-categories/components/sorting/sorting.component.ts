import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Components
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
// NGRX
import { Store } from "@ngrx/store";
import * as sortActions from "@rose/store_sort/sort.actions";
import { sortType } from "@rose/store_sort/sort.states";
// Enums
import { sortObjectVal } from "@rose/core_enums/sortobject";
@Component({
  selector: "app-sorting",
  imports: [TranslatePipe, FilterCardComponent],
  templateUrl: "./sorting.component.html",
  styleUrl: "./sorting.component.scss",
})
export class SortingComponent {
  private readonly _store = inject(Store);
  sortOptions = [
    {
      id: "sort-low-high",
      value: sortObjectVal.P_ASC,
      label: "all-categories.cardSort.Price: Low to High",
      checked: false,
    },
    {
      id: "sort-high-low",
      value: sortObjectVal.P_DESC,
      label: "all-categories.cardSort.Price: High to Low",
      checked: false,
    },
    {
      id: "sort-a-z",
      value: sortObjectVal.A_ASC,
      label: "all-categories.cardSort.Alphabetical: A-Z",
      checked: false,
    },
    {
      id: "sort-z-a",
      value: sortObjectVal.A_DESC,
      label: "all-categories.cardSort.Alphabetical: Z-A",
      checked: false,
    },
  ];

  onSortChange(val: sortObjectVal) {
    switch (val) {
      case sortObjectVal.P_ASC:
        this.sortByPrice("asc");
        break;
      case sortObjectVal.P_DESC:
        this.sortByPrice("desc");
        break;

      case sortObjectVal.A_DESC:
        this.sortByTitle("asc");
        break;

      case sortObjectVal.A_ASC:
        this.sortByTitle("desc");
        break;
    }
  }
  sortByPrice(type: sortType) {
    this._store.dispatch(
      sortActions.sortByPrice({
        sType: type,
      })
    );
  }

  sortByTitle(type: sortType) {
    this._store.dispatch(
      sortActions.sortByTitle({
        sType: type,
      })
    );
  }
}

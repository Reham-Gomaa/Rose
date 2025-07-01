import { Component, inject } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";

import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";

import { Store } from "@ngrx/store";
import * as sortActions from "../../../../../../../store/sort/sort.actions";
import { sortType } from "../../../../../../../store/sort/sort.states";
export enum sortObjectVal {
  P_ASC = "price-asc",
  P_DESC = "price-desc",
  A_DESC = "alpha-desc",
  A_ASC = "alpha-asc",
}
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
      value:  sortObjectVal.P_DESC,
      label: "all-categories.cardSort.Price: High to Low",
      checked: false,
    },
    {
      id: "sort-a-z",
      value:  sortObjectVal.A_ASC,
      label: "all-categories.cardSort.Alphabetical: A-Z",
      checked: false,
    },
    {
      id: "sort-z-a",
      value:  sortObjectVal.A_DESC,
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

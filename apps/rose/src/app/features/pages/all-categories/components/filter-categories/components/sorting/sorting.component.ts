import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { Store } from "@ngrx/store";
import * as sortActions from "../../../../../../../store/sort/sort.actions";
import { sortType } from "../../../../../../../store/sort/sort.states";

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
      value: "price-asc",
      label: "all-categories.cardSort.Price: Low to High",
      checked: false,
    },
    {
      id: "sort-high-low",
      value: "price-desc",
      label: "all-categories.cardSort.Price: High to Low",
      checked: false,
    },
    {
      id: "sort-a-z",
      value: "alpha-asc",
      label: "all-categories.cardSort.Alphabetical: A-Z",
      checked: false,
    },
    {
      id: "sort-z-a",
      value: "alpha-desc",
      label: "all-categories.cardSort.Alphabetical: Z-A",
      checked: false,
    },
  ];

  onSortChange(val: string) {
    if (val == "price-asc") {
      this.sortByPrice("asc");
    } else if (val == "price-desc") {
      this.sortByPrice("desc");
    } else if (val == "alpha-asc") {
      this.sortByTitle("asc");
    } else {
      this.sortByTitle("desc");
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

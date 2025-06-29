import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import {
  FilterItem,
  selectedItem,
} from "../../../../../../../core/interfaces/filter-item.interface";
import { TranslatePipe } from "@ngx-translate/core";
import { OccasionsService } from "../../../../../../../shared/services/occasions/occasions.service";
import { Subscription } from "rxjs";
import { occasionRes } from "../../../../../../../core/interfaces/occasions.interface";
import { Store } from "@ngrx/store";
import { loadSelectedOccasions} from "apps/rose/src/app/store/filter/filter.actions";

@Component({
  selector: "app-filter-occasions",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-occasions.component.html",
  styleUrl: "./filter-occasions.component.scss",
})
export class FilterOccasionsComponent implements OnInit, OnDestroy {
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _store = inject(Store);

  occasions!: FilterItem[];
  occasionsID!: Subscription;

  selectedItems: selectedItem[] = [] as selectedItem[];

  ngOnInit(): void {
    this.occasionsID = this._occasionsService.getcategoryOccasions().subscribe({
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


  ngOnDestroy(): void {
    this.occasionsID?.unsubscribe();
  }
}

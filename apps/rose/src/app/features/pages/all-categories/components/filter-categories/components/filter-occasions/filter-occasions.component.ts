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

@Component({
  selector: "app-filter-occasions",
  imports: [FilterCardComponent, CheckedCardComponent, TranslatePipe],
  templateUrl: "./filter-occasions.component.html",
  styleUrl: "./filter-occasions.component.scss",
})
export class FilterOccasionsComponent implements OnInit, OnDestroy {
  private readonly _occasionsService = inject(OccasionsService);
  occasions!: FilterItem[];
  occasionsID!: Subscription;

  ngOnInit(): void {
    this.occasionsID = this._occasionsService.getcategoryOccasions().subscribe({
      next: (res: occasionRes) => {
        this.occasions = res.occasions.map((occasion) => ({
          _id: occasion._id,
          name: occasion.name,
          category: occasion.name,
          productsCount: occasion.productsCount,
        }));
        console.log(this.occasions);
      },
      error: (err) => {
        console.error("Error fetching occasions:", err);
      },
    });
  }

  selectedItems: selectedItem[] = [] as selectedItem[];
  ngOnDestroy(): void {
    this.occasionsID?.unsubscribe();
  }
}

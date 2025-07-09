import { Component, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Components
import { FilterCardComponent } from "@rose/shared_Components_ui/filter-card/filter-card.component";
// NGRX
import { Store } from "@ngrx/store";
import { loadSelectedPrice } from "@rose/store_filter/filter.actions";
//Primeng
import { Slider } from 'primeng/slider';

@Component({
  selector: "app-filter-price",
  imports: [FilterCardComponent, TranslatePipe, FormsModule, Slider],
  templateUrl: "./filter-price.component.html",
  styleUrl: "./filter-price.component.scss",
})
export class FilterPriceComponent {
  private readonly _store = inject(Store);
  rangeValues: number[] = [200, 5000];
  private priceTimeout: ReturnType<typeof setTimeout> | null = null;

  change() {
    if (this.priceTimeout) {
      clearTimeout(this.priceTimeout);
    }
    this.priceTimeout = setTimeout(() => {
      this._store.dispatch(loadSelectedPrice({ minPrice: this.rangeValues[0], maxPrice: this.rangeValues[1] }));
    }, 400);
  };

}

import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { Store } from "@ngrx/store";
import { loadSelectedPrice } from "./../../../../../../../store/filter/filter.actions";

@Component({
  selector: "app-filter-price",
  imports: [FilterCardComponent, TranslatePipe, FormsModule, Slider],
  templateUrl: "./filter-price.component.html",
  styleUrl: "./filter-price.component.scss",
})
export class FilterPriceComponent {
  private readonly _store = inject(Store);
  rangeValues: number[] = [200, 5000];

  change(){
    this._store.dispatch(loadSelectedPrice({minPrice:this.rangeValues[0],maxPrice:this.rangeValues[1]}));
  };
  
}

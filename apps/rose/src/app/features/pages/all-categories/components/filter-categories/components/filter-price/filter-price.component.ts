import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-filter-price",
  imports: [FilterCardComponent, TranslatePipe, FormsModule, Slider],
  templateUrl: "./filter-price.component.html",
  styleUrl: "./filter-price.component.scss",
})
export class FilterPriceComponent {
  rangeValues: number[] = [20, 80];
}

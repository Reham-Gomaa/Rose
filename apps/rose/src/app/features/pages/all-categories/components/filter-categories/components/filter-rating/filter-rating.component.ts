import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FilterCardComponent } from "../../../../../../../shared/components/ui/filter-card/filter-card.component";
import { CheckedCardComponent } from "../../../../../../../shared/components/business/checkbox/checked-card.component";
import { FilterItem, selectedItem } from './../../../../../../../core/interfaces/filter-item.interface';

@Component({
  selector: 'app-filter-rating',
  imports: [FilterCardComponent, TranslatePipe, CheckedCardComponent],
  templateUrl: './filter-rating.component.html',
  styleUrl: './filter-rating.component.scss'
})
export class FilterRatingComponent {
  ratings :FilterItem[] = [
      { _id: '1-ratings', rating: 5},
      { _id: '2-ratings', rating: 4},
      { _id: '3-ratings', rating: 3},
      { _id: '4-ratings', rating: 2},
      { _id: '5-ratings', rating: 1}
    ];

    selectedItems: selectedItem[] = [] as selectedItem[];
}

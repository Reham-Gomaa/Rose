import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FilterCardComponent } from "../filter-card/filter-card.component";

@Component({
  selector: 'app-sorting',
  imports: [TranslatePipe, FilterCardComponent],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {

}

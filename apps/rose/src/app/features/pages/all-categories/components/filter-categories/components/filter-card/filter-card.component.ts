import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-card',
  imports: [ TranslatePipe ],
  templateUrl: './filter-card.component.html',
  styleUrl: './filter-card.component.scss',
})
export class FilterCardComponent {}

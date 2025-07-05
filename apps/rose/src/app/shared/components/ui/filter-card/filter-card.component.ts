import { booleanAttribute, Component, Input } from "@angular/core";
// Angular Form
import { FormsModule } from '@angular/forms';
//PrimeNg
import { SliderModule } from 'primeng/slider';

@Component({
  selector: "app-filter-card",
  imports: [ FormsModule, SliderModule ],
  templateUrl: "./filter-card.component.html",
  styleUrl: "./filter-card.component.scss",
})
export class FilterCardComponent {
  @Input({ transform: booleanAttribute }) underlineTitle = true;
  @Input() title!: string;

}

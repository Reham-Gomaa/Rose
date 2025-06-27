import { booleanAttribute, Component, Input } from "@angular/core";
import { FormsModule } from '@angular/forms';
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

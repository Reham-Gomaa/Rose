import { booleanAttribute, Component, Input } from "@angular/core";


@Component({
  selector: "app-filter-card",
  imports: [ ],
  templateUrl: "./filter-card.component.html",
  styleUrl: "./filter-card.component.scss",
})
export class FilterCardComponent {
  @Input({ transform: booleanAttribute }) underlineTitle = true;
  @Input() title!: string;

}

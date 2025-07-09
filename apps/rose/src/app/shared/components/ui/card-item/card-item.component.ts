import { Component, Input } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { Product } from "@rose/core_interfaces/carditem.interface";
//PrimeNg
import { RatingModule } from "primeng/rating";
import { FormsModule } from "@angular/forms";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-card-item",
  imports: [ RatingModule, FormsModule, SkeletonModule, TranslatePipe],
  templateUrl: "./card-item.component.html",
  styleUrl: "./card-item.component.scss",
})
export class CardItemComponent {
  @Input() productInfo: Product | undefined;
  @Input() loading = false;
}

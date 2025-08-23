import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RatingModule } from "primeng/rating";
import { FormsModule } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-review-list",
  imports: [CommonModule, RatingModule, FormsModule, TranslatePipe],
  templateUrl: "./review-list.component.html",
  styleUrl: "./review-list.component.scss",
})
export class ReviewListComponent {
  value = 4;
}

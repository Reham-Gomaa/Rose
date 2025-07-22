import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { ReviewFormComponent } from "./review-form/review-form.component";
import { ReviewListComponent } from "./review-list/review-list.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-product-review",
  imports: [CommonModule, RatingModule, FormsModule, TranslatePipe ,ReviewFormComponent, ReviewListComponent],
  templateUrl: "./product-review.component.html",
  styleUrl: "./product-review.component.scss",
})
export class ProductReviewComponent {

  value = 4.5









  //hooks





}

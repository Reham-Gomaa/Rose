import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-review-form",
  imports: [ReactiveFormsModule, RatingModule, TranslatePipe],
  templateUrl: "./review-form.component.html",
  styleUrl: "./review-form.component.scss",
})
export class ReviewFormComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  reviewForm!: FormGroup;
  isReviewAdded = false;

  initReviewForm() {
    this.reviewForm = this._fb.group({
      ratingValue: [null, Validators.required],
      reviewTitle: [null, Validators.required],
      reviewDescription: [null, Validators.required],
    });
  }

  addReview() {
    // console.log(this.reviewForm.value);
  }

  //hooks
  ngOnInit(): void {
    this.initReviewForm();
  }
}

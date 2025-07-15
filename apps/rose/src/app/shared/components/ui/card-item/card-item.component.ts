import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
// Images
import { NgOptimizedImage } from "@angular/common";
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
  imports: [RatingModule, FormsModule, SkeletonModule, TranslatePipe, NgOptimizedImage],
  templateUrl: "./card-item.component.html",
  styleUrl: "./card-item.component.scss",
})
export class CardItemComponent {
  @Input() productInfo: Product | undefined;
  @Input() loading = false;

   constructor(private router: Router) {} //constructor to inject the Router service

    goToDetails() { // Navigate to the product details page
    if (this.productInfo?.id) {
      this.router.navigate(['/dashboard/details', this.productInfo.id]);
    }
  }
}

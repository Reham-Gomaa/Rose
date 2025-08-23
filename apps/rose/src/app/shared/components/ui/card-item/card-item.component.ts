// @angular
import { Component, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { Product } from "@rose/core_interfaces/carditem.interface";
//PrimeNg
import { RatingModule } from "primeng/rating";
import { SkeletonModule } from "primeng/skeleton";
// shared-Directive
import { WishlistToggleDirective } from "./../../../directives/wishlistToggle.directive";
// cart store
import { Store } from "@ngrx/store";
import { addProductToCart } from "apps/rose/src/app/store/cart/cart-actions";

@Component({
  selector: "app-card-item",
  imports: [
    RatingModule,
    FormsModule,
    SkeletonModule,
    TranslatePipe,
    RouterLink,
    NgOptimizedImage,
    WishlistToggleDirective,
  ],
  templateUrl: "./card-item.component.html",
  styleUrl: "./card-item.component.scss",
})
export class CardItemComponent {
  private readonly store = inject(Store);

  @Input() productInfo: Product | undefined;
  @Input() loading = false;

  addProductToCart(p_id: string) {
    if (this.productInfo && this.productInfo.quantity > 0) {
      this.store.dispatch(addProductToCart({ p_id: p_id, qty: 1 }));
    }
  }
}

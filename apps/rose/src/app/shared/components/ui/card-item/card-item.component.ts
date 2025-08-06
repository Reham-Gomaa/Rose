// @angular
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
// Images
import { CommonModule, NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { Product } from "@rose/core_interfaces/carditem.interface";
//PrimeNg
import { RatingModule } from "primeng/rating";
import { SkeletonModule } from "primeng/skeleton";
// rxjs
import { Observable } from "rxjs";
// cart store
import { Store } from "@ngrx/store";
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { addProductToCart } from "apps/rose/src/app/store/cart/cart-actions";
import { selectCartItems } from "apps/rose/src/app/store/cart/cart-selectors";

@Component({
  selector: "app-card-item",
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    SkeletonModule,
    TranslatePipe,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: "./card-item.component.html",
  styleUrl: "./card-item.component.scss",
})
export class CardItemComponent {
  cartItems$!: Observable<cartItems[]>;

  @Input() productInfo: Product | undefined;
  @Input() loading = false;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  addProductToCart(p_id: string) {
    if (this.productInfo && this.productInfo.quantity > 0) {
      this.store.dispatch(addProductToCart({ p_id: p_id, qty: 1 }));
    }
  }
}

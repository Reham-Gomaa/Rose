// @angular
import { AfterViewInit, Component, inject, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
// Images
import { AsyncPipe, CommonModule, NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Interfaces
import { Product } from "@rose/core_interfaces/carditem.interface";
//PrimeNg
import { RatingModule } from "primeng/rating";
import { SkeletonModule } from "primeng/skeleton";
// cart store
import { Store } from "@ngrx/store";
import { addProductToCart } from "apps/rose/src/app/store/cart/cart-actions";
import {
  addProductToWishlist,
  removeSpecificItem,
} from "apps/rose/src/app/store/wishlist/wishlist-actions";
import { selectIsInWishlist } from "apps/rose/src/app/store/wishlist/wishlist-selectors";
import { Observable, take } from "rxjs";

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
    AsyncPipe,
  ],
  templateUrl: "./card-item.component.html",
  styleUrl: "./card-item.component.scss",
})
export class CardItemComponent implements AfterViewInit {
  private readonly store = inject(Store);
  isInWishlist$!: Observable<boolean>;

  @Input() productInfo: Product | undefined;
  @Input() loading = false;

  ngAfterViewInit(): void {
    this.isInWishlist$ = this.store.select(selectIsInWishlist(this.productInfo?._id!));
  }

  toggleWishlist() {
    if (!this.productInfo) return;

    this.isInWishlist$.pipe(take(1)).subscribe((isInWishlist) => {
      if (isInWishlist) {
        this.store.dispatch(removeSpecificItem({ p_id: this.productInfo?._id! }));
      } else {
        this.store.dispatch(addProductToWishlist({ p_id: this.productInfo?._id! }));
      }
    });
  }

  addProductToCart(p_id: string) {
    if (this.productInfo && this.productInfo.quantity > 0) {
      this.store.dispatch(addProductToCart({ p_id: p_id, qty: 1 }));
    }
  }
}

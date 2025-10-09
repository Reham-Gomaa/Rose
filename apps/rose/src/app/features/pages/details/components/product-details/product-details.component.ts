import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { Component, effect, inject, input, signal } from "@angular/core";
//interfaces
import { Product } from "@angular-monorepo/products";
import { cartItems } from "@rose/core_interfaces/cart.interface";
// PrimeNG
import { DialogModule } from "primeng/dialog";
// rxjs
import { Observable, take } from "rxjs";
// cart store
import { Store } from "@ngrx/store";
import { addProductToCart } from "apps/rose/src/app/store/cart/cart-actions";
import { selectCartItems } from "apps/rose/src/app/store/cart/cart-selectors";
import {
  addProductToWishlist,
  removeSpecificItem,
} from "apps/rose/src/app/store/wishlist/wishlist-actions";
import { selectIsInWishlist } from "apps/rose/src/app/store/wishlist/wishlist-selectors";
// Shared_Component
import { SoldOutComponent } from "@rose/shared_Components_ui/sold-out/soldOut.component";

@Component({
  selector: "app-product-details",
  imports: [NgOptimizedImage, DialogModule, AsyncPipe, SoldOutComponent],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {
  private readonly store = inject(Store);

  productDetails = input.required<Product>();
  currentImage = signal<string>("");
  showModal = signal<boolean>(false);
  cartItems$!: Observable<cartItems[]>;
  isInWishlist$!: Observable<boolean>;

  constructor() {
    // Watch for input changes
    effect(() => {
      if (this.productDetails()) {
        this.currentImage.set(this.productDetails().imgCover);
      }
    });

    this.cartItems$ = this.store.select(selectCartItems);
  }

  toggleWishlist(p_id: string) {
    this.isInWishlist$ = this.store.select(selectIsInWishlist(p_id));
    this.isInWishlist$.pipe(take(1)).subscribe((isInWishlist) => {
      if (isInWishlist) {
        this.store.dispatch(removeSpecificItem({ p_id: p_id }));
      } else {
        this.store.dispatch(addProductToWishlist({ p_id: p_id }));
      }
    });
  }

  addProductToCart(p_id: string) {
    this.cartItems$.pipe(take(1)).subscribe((cartItems) => {
      const existingItem = cartItems.find((item) => item.product._id === p_id);
      const storeQuantity = this.productDetails().quantity;

      if (existingItem ? storeQuantity > existingItem.quantity : storeQuantity > 0) {
        this.store.dispatch(addProductToCart({ p_id: p_id, qty: 1 }));
      }
    });
  }

  onThumbnailClick(image: string): void {
    this.currentImage.set(image);
  }

  openImageModal(): void {
    this.showModal.set(true);
  }
}

import { Component, input, signal, effect, DestroyRef, inject } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { NgClass } from "@angular/common";

//interfaces
import { Product } from "@rose/core_interfaces/carditem.interface";
import { cartItems } from "@rose/core_interfaces/cart.interface";
// PrimeNG
import { DialogModule } from "primeng/dialog";
// rxjs
import { Observable, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// cart store
import { Store } from "@ngrx/store";
import { selectCartItems } from "apps/rose/src/app/store/cart/cart-selectors";
import { addProductToCart } from "apps/rose/src/app/store/cart/cart-actions";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [NgOptimizedImage, DialogModule, NgClass],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  productDetails = input.required<Product>();
  currentImage = signal<string>("");
  showModal = signal<boolean>(false);
  cartItems$!: Observable<cartItems[]>;

  constructor() {
    // Watch for input changes
    effect(() => {
      if (this.productDetails()) {
        this.currentImage.set(this.productDetails().imgCover);
      }
    });

    this.cartItems$ = this.store.select(selectCartItems);
  }

  addProductToCart(p_id: string) {
    this.cartItems$.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((cartItems) => {
      const existingItem = cartItems.find((item) => item.product._id === p_id);
      if (!existingItem) return;
      const productQuantity = this.productDetails()?.quantity || 0;

      if ((!existingItem || existingItem.quantity > 0) && productQuantity > 0) {
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

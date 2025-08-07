// @angular
import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// rxjs
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Observable, take } from "rxjs";
// shared Interfaces
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// shared Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Cart Data from store
import { Store } from "@ngrx/store";
import {
  clearCart,
  deleteSpecificItem,
  getUserCart,
  updateQuantity,
} from "apps/rose/src/app/store/cart/cart-actions";
import {
  selectCartItems,
  selectCartItemsNum,
  selectTotalPrice,
} from "apps/rose/src/app/store/cart/cart-selectors";

@Component({
  selector: "app-cart",
  imports: [RouterLink, ButtonComponent, TranslatePipe, AsyncPipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
  animations: [fadeTransition],
})
export class CartComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  cartItems$!: Observable<cartItems[]>;
  cartItemsNum$!: Observable<number>;
  totalPrice$!: Observable<number>;

  ngOnInit(): void {
    this.getLoggedUserCart();
    this.selectData();
  }

  getLoggedUserCart() {
    this.store.dispatch(getUserCart());
  }

  selectData() {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartItemsNum$ = this.store.select(selectCartItemsNum);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  updateProductQuantity(p_id: string, qty: number) {
    this.cartItems$.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe((cartItems) => {
      const item = cartItems.find((item) => item.product._id === p_id);
      if (!item) return;

      const currentQty = item.quantity;
      const productQty = item.product.quantity;

      if (qty === +1 && productQty > currentQty) {
        this.store.dispatch(updateQuantity({ p_id: item.product._id, qty: +1 }));
      }

      if (qty === -1 && currentQty > 1) {
        this.store.dispatch(updateQuantity({ p_id: item.product._id, qty: -1 }));
      }
    });
  }

  onQuantityChange(productId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      // Reset to current quantity if invalid
      input.value = this.getCurrentQuantity(productId).toString();
      return;
    }

    this.cartItems$.pipe(take(1)).subscribe((cartItems) => {
      const item = cartItems.find((i) => i.product._id === productId);
      if (!item) return;

      // Check if quantity exceeds available stock
      if (newQuantity > item.product.quantity) {
        input.value = item.product.quantity.toString();
        // You might want to show a toast/message here
        return;
      }

      if (newQuantity !== item.quantity) {
        this.store.dispatch(
          updateQuantity({
            p_id: productId,
            qty: newQuantity - item.quantity,
          })
        );
      }
    });
  }

  // Helper method to get current quantity
  private getCurrentQuantity(productId: string): number {
    let currentQty = 1;
    this.cartItems$.pipe(take(1)).subscribe((items) => {
      const item = items.find((i) => i.product._id === productId);
      currentQty = item?.quantity || 1;
    });
    return currentQty;
  }

  removeCartItem(p_id: string) {
    this.store.dispatch(deleteSpecificItem({ p_id: p_id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}

// @angular
import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// rxjs
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, Observable, of, take, tap } from "rxjs";
// shared Interfaces
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// shared Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// primeng
import { Skeleton } from "primeng/skeleton";
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
  imports: [RouterLink, ButtonComponent, TranslatePipe, AsyncPipe, Skeleton],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
  animations: [fadeTransition],
})
export class CartComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  cartItems$!: Observable<cartItems[]>;
  userCartItems!: cartItems[];
  cartItemsNum$!: Observable<number>;
  totalPrice$!: Observable<number>;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.getLoggedUserCart();
    this.selectData();
  }

  getLoggedUserCart() {
    this.store.dispatch(getUserCart());
  }

  selectData() {
    this.store
      .select(selectCartItems)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          this.userCartItems = items;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    this.cartItemsNum$ = this.store.select(selectCartItemsNum);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  findItem(p_id: string): cartItems | undefined {
    return this.userCartItems.find((item) => item.product._id === p_id);
  }

  updateProductQuantity(p_id: string, qty: number) {
    const item = this.findItem(p_id);
    if (!item) return;

    const currentQty = item.quantity;
    const productQty = item.product.quantity;
    const newQty = item.quantity + qty;

    if (qty === 1 && productQty > currentQty) {
      this.store.dispatch(updateQuantity({ p_id: item.product._id, qty: newQty }));
    }

    if (qty === -1 && currentQty > 1) {
      this.store.dispatch(updateQuantity({ p_id: item.product._id, qty: newQty }));
    }
  }

  onQuantityChange(productId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      input.value = this.getCurrentQuantity(productId).toString();
      return;
    }

    const item = this.findItem(productId);
    if (!item) return;

    if (newQuantity > item.product.quantity) {
      input.value = this.getCurrentQuantity(productId).toString();
      return;
    }

    if (newQuantity !== item.quantity) {
      this.store.dispatch(
        updateQuantity({
          p_id: productId,
          qty: newQuantity,
        })
      );
    }
  }

  private getCurrentQuantity(productId: string): number {
    let currentQty = 1;
    const item = this.findItem(productId);
    currentQty = item?.quantity || 1;
    return currentQty;
  }

  removeCartItem(p_id: string) {
    this.store.dispatch(deleteSpecificItem({ p_id: p_id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}

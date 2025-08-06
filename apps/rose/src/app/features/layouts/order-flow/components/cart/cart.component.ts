// @angular
import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
// @ngx
import { Store } from "@ngrx/store";
import { TranslatePipe } from "@ngx-translate/core";
// rxjs
import { Observable, take } from "rxjs";
// shared Services & Interfaces
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { CartService } from "@rose/shared_services/cart/cart.service";
// shared Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Cart Data from store
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
import { cartState } from "apps/rose/src/app/store/cart/cart-states";

@Component({
  selector: "app-cart",
  imports: [
    RouterLink,
    ButtonComponent,
    TranslatePipe,
    ReactiveFormsModule,
    CustomInputComponent,
    AsyncPipe,
  ],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
  animations: [fadeTransition],
})
export class CartComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  readonly cartService = inject(CartService);
  readonly destroyRef = inject(DestroyRef);

  cart$!: Observable<cartState>;
  cartItems$!: Observable<cartItems[]>;
  cartItemsNum$!: Observable<number>;
  totalPrice$!: Observable<number>;

  constructor(private store: Store) {}

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

      if (qty === 1 && productQty > currentQty) {
        this.store.dispatch(updateQuantity({ p_id, qty }));
      }

      if (qty === -1 && currentQty > 1) {
        this.store.dispatch(updateQuantity({ p_id, qty }));
      }
    });
  }

  removeCartItem(id: string) {
    this.store.dispatch(deleteSpecificItem({ c_id: id }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}

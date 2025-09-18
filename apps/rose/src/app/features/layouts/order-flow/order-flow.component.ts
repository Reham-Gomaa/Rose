// @angular
import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
// Components
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CustomInputComponent } from "@angular-monorepo/ui";
import { CartComponent } from "./components/cart/cart.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { CartService } from "@rose/shared_services/cart/cart.service";
import { Observable } from "rxjs";
import { deleteSpecificItem, getUserCart } from "../../../store/cart/cart-actions";
import { selectCartItems, selectTotalPrice } from "../../../store/cart/cart-selectors";
import { CheckoutComponent } from "./components/checkout/checkout.component";

@Component({
  selector: "app-order-flow",
  imports: [
    TranslatePipe,
    CustomInputComponent,
    FormsModule,
    ButtonComponent,
    BestsellerSliderComponent,
    AsyncPipe,
    CartComponent,
    CheckoutComponent,
  ],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
  animations: [fadeTransition],
})
export class OrderFlowComponent implements OnInit {
  translationService = inject(TranslationService);
  cartService = inject(CartService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  totalPrice$!: Observable<number>;
  userCartItems: WritableSignal<cartItems[]> = signal<cartItems[]>([]);

  constructor() {
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  getCartItems() {
    this.store.dispatch(getUserCart());
    this.store
      .select(selectCartItems)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => this.userCartItems.set(items));
  }

  checkStoreQuantity() {
    const invalidItems = this.userCartItems().filter(
      (item) => item.quantity > item.product.quantity
    );

    if (invalidItems.length === 0) {
      this.goToPayment();
      return;
    }
    if (invalidItems.length > 0) {
      for (let i = 0; i < invalidItems.length; i++) {
        this.store.dispatch(deleteSpecificItem({ p_id: invalidItems[i].product._id }));
      }
      this.getCartItems();
      if (this.userCartItems.length > 0) {
        this.goToPayment();
      }
    }
  }

  goToPayment() {
    this.cartService.orderFlowState.set("checkout");
  }
}

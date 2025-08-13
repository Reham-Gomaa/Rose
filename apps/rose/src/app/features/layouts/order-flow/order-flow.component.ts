// @angular
import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
// Components
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { CartComponent } from "./components/cart/cart.component";
import { UserAddressComponent } from "./components/user-address/user-address.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { Observable } from "rxjs";
import { selectCartItems, selectTotalPrice } from "../../../store/cart/cart-selectors";
import { CartService } from "@rose/shared_services/cart/cart.service";
import { deleteSpecificItem, getUserCart } from "../../../store/cart/cart-actions";
import { cartItems } from "@rose/core_interfaces/cart.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    UserAddressComponent,
  ],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
  animations: [fadeTransition],
})
export class OrderFlowComponent {
  translationService = inject(TranslationService);
  cartService = inject(CartService);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  totalPrice$!: Observable<number>;
  userCartItems: cartItems[] = [];

  constructor() {
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  checkStoreQuantity() {
    this.store.dispatch(getUserCart());
    this.store
      .select(selectCartItems)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items) => (this.userCartItems = items));

    const invalidItems = this.userCartItems.filter((item) => item.quantity > item.product.quantity);

    if (invalidItems.length > 0) {
      for (let i = 0; i < invalidItems.length; i++) {
        this.store.dispatch(deleteSpecificItem({ p_id: invalidItems[i].product._id }));
      }
      return;
    }
    this.goToPayment();
  }

  goToPayment() {
    this.cartService.orderFlowState.set("userAddress");
  }
}

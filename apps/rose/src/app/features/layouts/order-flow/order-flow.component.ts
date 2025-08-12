// @angular
import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
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
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { selectTotalPrice } from "../../../store/cart/cart-selectors";
import { toCartState, toPaymentState } from "../../../store/orderFlow-states/orderflow.action";
import { selectOrderFlow } from "../../../store/orderFlow-states/orderflow.selector";

export type orderFlowState = "cart" | "userAddress";

@Component({
  selector: "app-order-flow",
  imports: [
    RouterLink,
    RouterOutlet,
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
export class OrderFlowComponent implements OnInit {
  translationService = inject(TranslationService);
  private readonly store = inject(Store);

  totalPrice$!: Observable<number>;
  orderFlow$!: Observable<any>;
  orderFlowState!: orderFlowState;

  goToPayment() {
    this.orderFlowState = "userAddress";
    //this.store.dispatch(toPaymentState());
  }

  goToCart() {
    this.orderFlowState = "cart";
    //this.store.dispatch(toCartState());
  }

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    this.goToCart();
    console.log(this.orderFlowState);
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.orderFlow$ = this.store.select(selectOrderFlow);
  }
}

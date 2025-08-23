import { Component, inject, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import * as checkoutActions from "@rose/checkout/checkout.actions";
import * as checkoutSelectors from "@rose/checkout/checkout.selectors";
import { pMethod } from "@rose/checkout/checkout.state";
import { payMethod } from "../../models/payment";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-payment-method",
  imports: [NgOptimizedImage],
  templateUrl: "./payment-method.component.html",
  styleUrl: "./payment-method.component.scss",
})
export class PaymentMethodComponent {
  private store = inject(Store);

  methodSelected!: pMethod | null;

  ngOnInit() {
    this.store.select(checkoutSelectors.selectedPayMethod).subscribe({
      next: (method) => {
        this.methodSelected = method;
      },
    });
  }

  paymentMethods: WritableSignal<payMethod[]> = signal([
    {
      id: 1,
      imageSrc: "/images/payMethods/cash.AVIF",
      title: "Cash on Delivery",
      desc: "You’ll pay in cash when your order is delivered.",
    },
    {
      id: 2,
      imageSrc: "/images/payMethods/credit.AVIF",
      title: "Credit Card",
      desc: "You’ll be securely redirected to Stripe to complete your payment.",
    },
  ]);

  setPaymentMethod(methodName: string) {
    const methodToStore = methodName.split(" ")[0].toLowerCase();
    if (methodToStore == pMethod.CASH) {
      this.store.dispatch(checkoutActions.selectPayMethod({ method: pMethod.CASH }));
    } else {
      this.store.dispatch(checkoutActions.selectPayMethod({ method: pMethod.CREDIT }));
    }
  }
}

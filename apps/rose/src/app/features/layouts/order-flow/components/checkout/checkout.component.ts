import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as checkoutActions from "@rose/checkout/checkout.actions";
import * as checkoutSelectors from "@rose/checkout/checkout.selectors";

import { AddressChoiceComponent } from "./components/address-choice/address-choice.component";
import { PaymentMethodComponent } from "./components/payment-method/payment-method.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { progressStep } from "./models/progress.step";
import { pMethod } from "@rose/checkout/checkout.state";

@Component({
  selector: "app-checkout",
  imports: [StepperComponent],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  private store = inject(Store);
  private selectedMethod!: pMethod | null;
  checkoutSteps: progressStep[] = [
    {
      value: 1,
      label: "Shipping Address",
      component: AddressChoiceComponent,
    },
    {
      value: 2,
      label: "Payment Method",
      component: PaymentMethodComponent,
    },
  ];

  ngOnInit() {
    this.store.select(checkoutSelectors.selectedPayMethod).subscribe({
      next: (selectedMethod) => {
        this.selectedMethod = selectedMethod;
      },
    });
  }

  confirmCheckOutProcess() {
    if (this.selectedMethod!.toLowerCase() == pMethod.CASH) {
      this.makeCashOrder();
    } else {
      this.makeCreditOrder();
    }
  }

  makeCashOrder() {
    this.store.dispatch(checkoutActions.createCashOrder());
  }
  makeCreditOrder() {
    this.store.dispatch(checkoutActions.createCheckoutSession());
  }
}

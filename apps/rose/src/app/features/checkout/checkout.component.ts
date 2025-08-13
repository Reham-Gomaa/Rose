import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddressChoiceComponent } from "./components/address-choice/address-choice.component";
import { PaymentMethodComponent } from "./components/payment-method/payment-method.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { progressStep } from "./models/progress.step";
import { payInfo } from "./checkout/paymentInfo";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { CheckoutService } from "./services/checkout/checkout.service";

@Component({
  selector: "app-checkout",
  imports: [CommonModule, StepperComponent],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  private checkOut = inject(CheckoutService)
  checkoutSteps : progressStep[] =[
    {
      value:1,
      label: "Shipping Address",
      component: AddressChoiceComponent
    },
    {
      value:2,
      label: "Payment Method",
      component:PaymentMethodComponent
    }
  ]

  confirmCheckOutProcess(pInfo:payInfo){
    if(pInfo.type?.toLowerCase().includes("cash")) {
      this.makeCashOrder()
    }else {
     this.makeCreditOrder()
    }
  }



  makeCashOrder(){
    console.log(this.checkOut.paymentInfo().shippingAddress);
    this.checkOut.createCashOrder().subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }
  makeCreditOrder(){
    console.log(this.checkOut.paymentInfo().shippingAddress);

    this.checkOut.createCheckoutSession().subscribe({
      next: (response) => {
        console.log(response);
      }
    })

  }
}

import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal, WritableSignal } from "@angular/core";
import { payMethod } from "../../models/payment";
import { CheckoutService } from "../../services/checkout/checkout.service";

@Component({
  selector: "app-payment-method",
  imports: [CommonModule],
  templateUrl: "./payment-method.component.html",
  styleUrl: "./payment-method.component.scss",
})
export class PaymentMethodComponent {


  private checkOutService = inject(CheckoutService)

  methodSelected = computed(()=> this.checkOutService.paymentInfo())

  paymentMethods:WritableSignal<payMethod[]> = signal([
    {
      id:1,
      imageSrc:"/images/payMethods/cash.png",
      title:"Cash on Delivery",
      desc:"You’ll pay in cash when your order is delivered."
    },
    {
      id:2,
      imageSrc:"/images/payMethods/credit.png",
      title:"Credit Card",
      desc:"You’ll be securely redirected to Stripe to complete your payment."
    }
  ]);

  setPaymentMethod(pId:number){
    const selectedMethod = this.paymentMethods().find((m)=>{
      return m.id === pId
    })
    this.checkOutService.paymentInfo().type = selectedMethod?.title!
    // console.log(this.checkOutService.paymentInfo());
    // console.log(selectedMethod);
  }


}

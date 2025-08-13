import { CommonModule } from "@angular/common";
import { Component, computed, inject, input, output, OutputEmitterRef } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { progressStep } from "../../models/progress.step";
import { CheckoutService } from "../../services/checkout/checkout.service";
import { payInfo } from "../../checkout/paymentInfo";
@Component({
  selector: "app-stepper",
  imports: [CommonModule, ButtonModule, StepperModule],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {

  makeOrder:OutputEmitterRef<payInfo> = output()

  private checkoutService = inject(CheckoutService)
  steps=input<progressStep[]>([])
  addressSelected = computed(()=>Object.keys(this.checkoutService.shippingAddress()!).length == 0)
  methodSelected = computed(()=> this.checkoutService.paymentInfo())

startCheckOutProcess(){
  this.makeOrder.emit(this.checkoutService.paymentInfo())
}


}

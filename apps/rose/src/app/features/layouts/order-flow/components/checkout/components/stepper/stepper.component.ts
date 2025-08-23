import { AsyncPipe, CommonModule, JsonPipe } from "@angular/common";
import { Component, inject, input, output, OutputEmitterRef } from "@angular/core";
import { Store } from "@ngrx/store";
import * as checkoutSelectors from "@rose/checkout/checkout.selectors";
import { pMethod } from "@rose/checkout/checkout.state";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { Observable } from "rxjs";
import { progressStep } from "../../models/progress.step";
@Component({
  selector: "app-stepper",
  imports: [CommonModule, ButtonModule, StepperModule, JsonPipe, AsyncPipe],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  makeOrder: OutputEmitterRef<void> = output();

  private store = inject(Store);
  steps = input<progressStep[]>([]);
  addressSelected$!: Observable<Address | null>;
  methodSelected$!: Observable<pMethod | null>;

  ngOnInit() {
    this.addressSelected$ = this.store.select(checkoutSelectors.selectedShippingAdd);
    this.methodSelected$ = this.store.select(checkoutSelectors.selectedPayMethod);
  }
  startCheckOutProcess() {
    this.makeOrder.emit();
  }
}

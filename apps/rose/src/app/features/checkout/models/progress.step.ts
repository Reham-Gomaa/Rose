import { Type } from "@angular/core";
import { AddressChoiceComponent } from "../components/address-choice/address-choice.component";
import { PaymentMethodComponent } from "../components/payment-method/payment-method.component";

export interface progressStep {
  value:number,
  label:string,
  component:Type<any>
}

import { NgOptimizedImage } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";

@Component({
  selector: "app-empty-cart",
  imports: [NgOptimizedImage],
  templateUrl: "./emptyCart.component.html",
  styleUrl: "./emptyCart.component.scss",
})
export class EmptyCartComponent {
  message: InputSignal<string> = input("");
}

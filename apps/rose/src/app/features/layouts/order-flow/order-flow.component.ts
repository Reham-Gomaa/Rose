import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";

@Component({
  selector: "app-order-flow",
  imports: [RouterLink, CartComponent],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
})
export class OrderFlowComponent {}

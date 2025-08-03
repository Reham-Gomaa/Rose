import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";

@Component({
  selector: "app-cart",
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {}

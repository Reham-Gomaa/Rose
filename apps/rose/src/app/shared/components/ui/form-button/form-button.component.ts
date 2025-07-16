import { Component, input, InputSignal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-form-button",
  imports: [CommonModule],
  templateUrl: "./form-button.component.html",
  styleUrl: "./form-button.component.scss",
})
export class FormButtonComponent {
  text : InputSignal<string> = input('');
}

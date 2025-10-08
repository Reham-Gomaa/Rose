import { Component, input, Input, InputSignal } from "@angular/core";

@Component({
  selector: "app-button",
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  text: InputSignal<string> = input("");
  icon: InputSignal<string> = input("");
  borderRadius: InputSignal<string> = input("");
  padding: InputSignal<string> = input("");
  margin: InputSignal<string> = input("");
  transition: InputSignal<string> = input("");
  rowReverse: InputSignal<string> = input("");
  bgColor: InputSignal<string> = input("");
  textColor: InputSignal<string> = input("");
  disable: InputSignal<boolean> = input(false);
}

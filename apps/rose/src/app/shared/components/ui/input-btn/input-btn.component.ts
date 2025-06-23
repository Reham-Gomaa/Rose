import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-input-btn",
  imports: [FormsModule],
  templateUrl: "./input-btn.component.html",
  styleUrl: "./input-btn.component.scss",
})
export class InputBtnComponent {
  @Input() placeholder = "";
  @Input() buttonText = "";
  @Input() type = "";
  @Input() name = "";
  @Input() showIcon = true;
  @Input() showBtn = true;
  @Input() inputValue = "";
  @Input() inputId = "input-field";
  @Input() buttonType = "submit";
  @Input() inputType = "text";
  @Input() disableMobileStyles = false;

  @Output() inputValueChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<void>();

  onInputChange(newValue: string) {
    this.inputValue = newValue;
    this.inputValueChange.emit(newValue);
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}

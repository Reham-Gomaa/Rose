import { booleanAttribute, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-form-button",
  imports: [],
  templateUrl: "./form-button.component.html",
  styleUrl: "./form-button.component.scss",
})
export class FormButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() type: "submit" | "button" | "reset" = "submit";
  @Input() icon?: string;
  @Input() loadingText?: string;
  @Input() ariaLive: "polite" | "assertive" | "off" = "polite";
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input({ transform: booleanAttribute }) fullWidth = true;

  @Output() onClick = new EventEmitter<Event>();

  getButtonClasses(): string {
    const fullWidthClass = this.fullWidth ? "w-full" : "";

    return [fullWidthClass].filter(Boolean).join(" ");
  }
}

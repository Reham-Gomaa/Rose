import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appEnglishOnly]",
})
export class EnglishOnlyDirective {
  private regex = /^[a-zA-Z0-9\s]*$/;

  constructor(private el: ElementRef) {}

  @HostListener("keypress", ["$event"]) onKeyPress(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!this.regex.test(inputChar)) {
      event.preventDefault();
    }
  }

  @HostListener("paste", ["$event"]) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData("text");
    if (pastedText && !this.regex.test(pastedText)) {
      event.preventDefault();
    }
  }
}

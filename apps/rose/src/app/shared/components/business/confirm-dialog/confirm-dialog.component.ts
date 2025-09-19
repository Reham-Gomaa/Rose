import { Component, EventEmitter, input, Input, InputSignal, Output } from "@angular/core";
// PrimeNg
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-confirm-dialog",
  imports: [DialogModule, ButtonModule],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  message: InputSignal<string> = input("Are you sure you want to proceed?");
  subMessage: InputSignal<string> = input("This action cannot be undone.");
  cancelLabel: InputSignal<string> = input("Cancel");
  confirmLabel: InputSignal<string> = input("Confirm");
  //visible: InputSignal<boolean> = input(false);
  @Input() visible: boolean = false;
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmed.emit(true);
    this.visible = false;
  }

  onCancel() {
    this.confirmed.emit(false);
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}

import { Component, EventEmitter, Input, Output } from "@angular/core";
// PrimeNg
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "lib-confirm-dialog",
  imports: [DialogModule, ButtonModule],
  templateUrl: "./confirm-dialog.component.html",
  styleUrl: "./confirm-dialog.component.scss",
})
export class ConfirmDialogComponent {
  @Input() message: string = "Are you sure you want to proceed?";
  @Input() subMessage: string = "This action cannot be undone.";
  @Input() cancelLabel: string = "Cancel";
  @Input() confirmLabel: string = "Confirm";
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

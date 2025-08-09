import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-confirm-dialog",
  imports: [DialogModule, ButtonModule],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  @Input() header: string = "Confirmation";
  @Input() message: string = "Are you sure you want to proceed?";
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

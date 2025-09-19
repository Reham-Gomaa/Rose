import { Component, input, Input } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-input-error-handling",
  imports: [TranslatePipe],
  templateUrl: "./input-error-handling.component.html",
  styleUrl: "./input-error-handling.component.scss",
})
export class InputErrorHandlingComponent {
  @Input() control!: AbstractControl;

  readonly passwordPattern =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
  readonly phonePattern = "/^(\\+201|01)[0125][0-9]{8}$/";
}

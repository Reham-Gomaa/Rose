import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-handling',
  imports: [],
  templateUrl: './input-error-handling.component.html',
  styleUrl: './input-error-handling.component.scss'
})
export class InputErrorHandlingComponent {
  @Input() control!: AbstractControl;

  readonly passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]).{8,}$";

}

import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./input-error.component.html",
  styleUrl: "./input-error.component.scss",
})
export class InputErrorMessageComponent {
  @Input() control?: AbstractControl | null;
  @Input() customMessages?: { [key: string]: string };

  private defaultMessages: { [key: string]: string } = {
    required: 'This field is required',
  };

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errorKey = Object.keys(this.control.errors)[0];
    
    if (this.customMessages && this.customMessages[errorKey]) {
      return this.customMessages[errorKey];
    }

    return this.defaultMessages[errorKey] || 'Invalid field';
  }
}
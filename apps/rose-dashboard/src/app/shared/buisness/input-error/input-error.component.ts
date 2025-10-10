import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./input-error.component.html",
  styleUrl: "./input-error.component.scss",
})
export class InputErrorMessageComponent {
  @Input() control?: AbstractControl | null;
  @Input() customMessages?: { [key: string]: string };

  constructor(private translate: TranslateService) {}

  private defaultMessages: { [key: string]: string } = {
    required: 'common.errors.required',
    minlength: 'common.errors.minLength',
    maxlength: 'common.errors.maxLength',
    min: 'common.errors.minValue',
    max: 'common.errors.maxValue',
    email: 'common.errors.email'
  };

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errorKey = Object.keys(this.control.errors)[0];
    
    let translationKey = '';
    
    if (this.customMessages && this.customMessages[errorKey]) {
      translationKey = this.customMessages[errorKey];
    } else if (this.defaultMessages[errorKey]) {
      translationKey = this.defaultMessages[errorKey];
    } else {
      translationKey = 'common.errors.generic';
    }

    return this.translate.instant(translationKey);
  }
}
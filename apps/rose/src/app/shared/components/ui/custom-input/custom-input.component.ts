import { Component, forwardRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent implements ControlValueAccessor {
  id = input<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  labelText = input<string>('');
  showPassword = false;

  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputType() {
    if (this.type() === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}

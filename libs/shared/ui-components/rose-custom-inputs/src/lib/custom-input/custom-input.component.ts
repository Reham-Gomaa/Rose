import { Component, forwardRef, input, output } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
// shared-components
import { InputErrorHandlingComponent } from "../input-error-handling/input-error-handling.component";

@Component({
  selector: "lib-custom-input",
  imports: [InputErrorHandlingComponent],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  templateUrl: "./custom-input.component.html",
  styleUrl: "./custom-input.component.scss",
})
export class CustomInputComponent implements ControlValueAccessor {
  id = input<string>();
  type = input<string>("text");
  placeholder = input<string>("");
  labelText = input<string>("");
  errorHandilgControl = input<AbstractControl>();

  // New file input
  accept = input<string>();
  fileSelected = output<File>(); // Emit file when selected

  showPassword = false;
  selectedFile: File | null = null; //file

  value: string = "";
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputType() {
    if (this.type() === "password") {
      return this.showPassword ? "text" : "password";
    }
    return this.type();
  }

   get isFileInput() { //file
    return this.type() === "file";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

openFileInput() { //file
  const id = this.id();
  if (id) {
    const fileInput = document.getElementById(id);
    fileInput?.click();
  }
}


onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.fileSelected.emit(this.selectedFile);

    // Passing the file name as string to onChange
    this.onChange(this.selectedFile.name);
    this.onTouched();
  }
}

writeValue(value: File | string | null): void {
  if (value instanceof File) {
    this.selectedFile = value;
    this.value = value.name;
  } else if (typeof value === 'string') {
    this.value = value;
  } else {
    this.selectedFile = null;
    this.value = '';
  }
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

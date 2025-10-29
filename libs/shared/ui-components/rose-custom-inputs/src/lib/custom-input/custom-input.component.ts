import { Component, forwardRef, inject, input, output } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
// shared-components
import { InputErrorHandlingComponent } from "../input-error-handling/input-error-handling.component";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "lib-custom-input",
  imports: [InputErrorHandlingComponent, TranslateModule],
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
  private _translate = inject(TranslateService);
  id = input<string>();
  type = input<string>("text");
  placeholder = input<string>("");
  labelText = input<string>();
  errorHandilgControl = input<AbstractControl>();

  // Enhanced file inputs with backward compatibility
  multiple = input<boolean>(false);
  accept = input<string>();
  fileSelected = output<File>(); // For single file (existing usage)
  filesSelected = output<File[]>(); // NEW: For multiple files

  showPassword = false;
  selectedFile: File | null = null;
  selectedFiles: File[] = []; // NEW: For multiple files

  value = "";
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputType() {
    if (this.type() === "password") {
      return this.showPassword ? "text" : "password";
    }
    return this.type();
  }

  get isFileInput() {
    return this.type() === "file";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  openFileInput() {
    const id = this.id();
    if (id) {
      const fileInput = document.getElementById(id) as HTMLInputElement;
      fileInput?.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (this.multiple()) {
        // Handle multiple files
        this.selectedFiles = Array.from(input.files);
        this.filesSelected.emit(this.selectedFiles);
        
        // For form control, emit file names as comma-separated string
        const fileNames = this.selectedFiles.map(file => file.name).join(', ');
        this.onChange(fileNames);
      } else {
        // Handle single file (original behavior - maintains backward compatibility)
        this.selectedFile = input.files[0];
        this.fileSelected.emit(this.selectedFile);
        this.onChange(this.selectedFile.name);
      }
      this.onTouched();
    }
  }

  writeValue(value: File | File[] | string | null): void {
    if (Array.isArray(value)) {
      // Handle multiple files
      this.selectedFiles = value;
      this.value = value.map(file => file.name).join(', ');
    } else if (value instanceof File) {
      // Handle single file
      this.selectedFile = value;
      this.value = value.name;
    } else if (typeof value === "string") {
      this.value = value;
    } else {
      this.selectedFile = null;
      this.selectedFiles = [];
      this.value = "";
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
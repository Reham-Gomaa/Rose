import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";

@Component({
  selector: "app-category-occasion-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent],
  templateUrl: "./category-occasion-form.component.html",
})
export class CategoryOccasionFormComponent implements OnChanges {
  @Input() initialData: { name: string; image: string | null } | null = null; // gets data for edit
  @Output() categorySubmit = new EventEmitter<FormData>();

  categoryForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  previewUrl: string | null = null; // to show existing image

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      image: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.categoryForm.patchValue({
        name: this.initialData.name,
      });

      // set preview if editing
      if (this.initialData.image) {
        this.previewUrl = this.initialData.image;
        this.categoryForm.get('image')?.clearValidators(); // image not required on edit
        this.categoryForm.get('image')?.updateValueAndValidity();
      }
    }
  }

  // Getter for validation
  get nameControl(): AbstractControl {
    return this.categoryForm.get('name') as AbstractControl;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.categoryForm.patchValue({ image: this.selectedFile });
      this.categoryForm.get('image')?.updateValueAndValidity();

      // update preview
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // onSubmit(): void {
  //   if (this.categoryForm.valid) {
  //     this.isSubmitting = true;

  //     const formData = new FormData();
  //     formData.append('name', this.categoryForm.get('name')?.value);

  //     if (this.selectedFile) {
  //       formData.append('image', this.selectedFile);
  //     }

  //     this.categorySubmit.emit(formData);

  //     setTimeout(() => {
  //       this.isSubmitting = false;
  //     }, 2000);
  //   } else {
  //     this.markFormGroupTouched();
  //   }
  // }

  onSubmit(): void {
  if (this.categoryForm.valid) {
    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('name', this.categoryForm.get('name')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 🔹 Debug: log values before emitting
    console.log("Submitting category form:");
    console.log("Name:", formData.get('name'));
    console.log("Image:", formData.get('image'));

    this.categorySubmit.emit(formData);

    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  } else {
    this.markFormGroupTouched();
  }
}


  private markFormGroupTouched(): void {
    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    this.isSubmitting = false;
  }
}

  


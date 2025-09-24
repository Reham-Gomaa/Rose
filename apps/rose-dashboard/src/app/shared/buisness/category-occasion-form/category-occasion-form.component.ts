import { Component, input, output, effect, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

// Components
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";

export interface FormData {
  name: string;
  image?: string;
}

@Component({
  selector: "app-category-occasion-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent],
  templateUrl: "./category-occasion-form.component.html",
  styleUrls: ["./category-occasion-form.component.scss"]
})
export class SharedCategoryOccasionFormComponent implements OnInit {
  // Inputs for customization
  nameFieldId = input<string>('name');
  imageFieldId = input<string>('image');
  nameLabel = input<string>('Name');
  imageLabel = input<string>('Image');
  namePlaceholder = input<string>('Enter name');
  uploadButtonText = input<string>('Upload file');
  submitButtonText = input<string>('Add');
  isLoading = input<boolean>(false);
  initialData = input<FormData | null>(null);

  // Outputs
  formSubmit = output<FormData>();
  formValid = output<boolean>();

  form!: FormGroup;
  selectedFileName: string = '';

  constructor(private fb: FormBuilder) {
    // Watch for initial data changes
    effect(() => {
      const data = this.initialData();
      if (data && this.form) {
        this.form.patchValue(data);
        if (data.image) {
          this.selectedFileName = this.extractFileName(data.image);
        }
      }
    });

    // Watch for form validity changes
    effect(() => {
      if (this.form) {
        this.formValid.emit(this.form.valid);
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', Validators.required]
    });

    // Emit initial validity
    this.form.statusChanges.subscribe(() => {
      this.formValid.emit(this.form.valid);
    });

    // Set initial data if provided
    const data = this.initialData();
    if (data) {
      this.form.patchValue(data);
      if (data.image) {
        this.selectedFileName = this.extractFileName(data.image);
      }
    }
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.selectedFileName = file.name;
      //  hena ha handle el file upload to get the image URL
      // For now, we'll just set the file name
      this.form.patchValue({ image: file.name });
    }
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as FormData);
    }
  }

  private extractFileName(imagePath: string): string {
    return imagePath.split('/').pop() || imagePath;
  }
}
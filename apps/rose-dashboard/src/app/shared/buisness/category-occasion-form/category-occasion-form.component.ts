import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
import { FormButtonComponent } from "@angular-monorepo/rose-buttons"; 
import { DialogModule } from 'primeng/dialog'; 
import { TranslateModule,TranslateService } from "@ngx-translate/core";

export type EntityType = 'category' | 'occasion';

@Component({
  selector: "app-category-occasion-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomInputComponent, FormButtonComponent, DialogModule,TranslateModule], 
  templateUrl: "./category-occasion-form.component.html",
  styleUrl: "./category-occasion-form.component.scss"
})
export class CategoryOccasionFormComponent implements OnChanges, OnDestroy{
  private _translate = inject(TranslateService);
  @Input() entityType: EntityType = 'category';
  @Input() initialData: { name: string; image: string | File | null } | null = null;
  @Output() formSubmit = new EventEmitter<FormData>();

  entityForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  previewUrl: string | null = null;
  isEditMode = false;
  showImageModal = false;

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      image: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.isEditMode = !!this.initialData;
      
      this.entityForm.patchValue({
        name: this.initialData.name,
      });

      // In edit mode, remove image validators since we're not uploading
      if (this.isEditMode) {
        this.entityForm.get('image')?.clearValidators();
        this.entityForm.get('image')?.updateValueAndValidity();
      }

      if (this.initialData.image) {
        if (typeof this.initialData.image === 'string') {
          this.previewUrl = this.initialData.image;
        } else {
          this.selectedFile = this.initialData.image;
          this.previewUrl = URL.createObjectURL(this.selectedFile);
        }
      }
    }
  }

  
 getFormTitle(): string {
  const mode = this.isEditMode ? 'edit' : 'add';
  const modeText = this._translate.instant(`common.modes.${mode}`);
  
  if (this.isEditMode && this.initialData?.name) {
  
    const baseTitle = this._translate.instant(`${this.entityType}.addEdit.formTitle`, { mode: modeText });
    return `${baseTitle}: ${this.initialData.name}`;
  } else {
   
    return this._translate.instant(`${this.entityType}.addEdit.formTitle`, { mode: modeText });
  }
}

  getFieldLabel(field: string): string {
    return this._translate.instant(`${this.entityType}.addEdit.fields.${field}`);
  }

  getFieldPlaceholder(field: string): string {
    return this._translate.instant(`${this.entityType}.addEdit.fields.${field}Placeholder`);
  }

  getSubmitButtonText(): string {
    const mode = this.isEditMode ? 'edit' : 'add';
    const modeText = this._translate.instant(`common.modes.${mode}`);
    return this._translate.instant(`${this.entityType}.addEdit.buttons.submit`, { mode: modeText });
  }

  getLoadingText(): string {
    return this._translate.instant(`${this.entityType}.addEdit.buttons.saving`);
  }

  getViewImageText(): string {
    return this._translate.instant(`${this.entityType}.addEdit.buttons.viewImage`);
  }

  getNoImageText(): string {
    return this._translate.instant(`${this.entityType}.addEdit.messages.noImage`);
  }

  getImagePreviewText(): string {
    return this._translate.instant(`${this.entityType}.addEdit.messages.imagePreview`);
  }

  getModalTitle(): string {
    return this._translate.instant('common.imageModal.title');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.entityForm.patchValue({ image: this.selectedFile });
      this.entityForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  openImageModal(): void {
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }

  get nameControl(): AbstractControl {
    return this.entityForm.get('name') as AbstractControl;
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append('name', this.entityForm.get('name')?.value);

      if (!this.isEditMode && this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      console.log(`Submitting ${this.entityType} form:`);
      console.log("Name:", formData.get('name'));
      console.log("Image:", this.selectedFile ? "New file selected" : "Using existing image");

      this.formSubmit.emit(formData);

      setTimeout(() => {
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.entityForm.controls).forEach(key => {
      const control = this.entityForm.get(key);
      control?.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}
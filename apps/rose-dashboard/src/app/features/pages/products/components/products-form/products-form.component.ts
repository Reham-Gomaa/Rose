import { Component, inject, OnInit, signal, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
// Shared_Service
import { CategoriesService } from "@angular-monorepo/categories";
import { OccasionService } from "@angular-monorepo/occasions";
import { ProductDetailsRes, ProductsService } from "@angular-monorepo/products";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
// Components
import { FormButtonComponent } from "@angular-monorepo/rose-buttons";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
import { InputErrorMessageComponent } from "@rose_dashboard/shared_buisness/input-error/input-error.component";
// Primeng
import { MessageService } from "primeng/api";
import { Skeleton } from "primeng/skeleton";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { CurrencyPipe, NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-products-form",
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    CustomInputComponent,
    FormButtonComponent,
    DialogModule,
    DropdownModule,
    Skeleton,
    TranslateModule,
    InputErrorMessageComponent,
    CurrencyPipe,
  ],
  templateUrl: "./products-form.component.html",
  styleUrl: "./products-form.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class ProductsFormComponent implements OnInit {
  private _messageService = inject(MessageService);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private occasionService = inject(OccasionService);
  private _translate = inject(TranslateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isEditMode = false;
  productId: string | null = null;
  initialData: any = null;
  isLoading = signal(true);
  private destroy$ = new Subject<void>();

  showImageModal = false;
  modalImageUrl: string | null = null;
  modalImageTitle: string = "";

  productForm: FormGroup;
  selectedCoverFile: File | null = null;
  selectedGalleryFiles: File[] = [];
  coverPreviewUrl: string | null = null;
  galleryPreviewUrls: string[] = [];
  isSubmitting = false;

  categories = signal<any[]>([]);
  occasions = signal<any[]>([]);

  constructor() {
    this.productForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      price: ["", [Validators.required, Validators.min(0)]],
      discount: ["", [Validators.min(0), Validators.max(100)]],
      quantity: ["", [Validators.required, Validators.min(0)]],
      category: ["", [Validators.required]],
      occasion: ["", [Validators.required]],
      imgCover: [null, [Validators.required]],
      images: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.productId;

    this.loadCategories();
    this.loadOccasions();

    if (this.isEditMode && this.productId) {
      this.productsService
        .getSpecificProduct(this.productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: ProductDetailsRes) => {
            this.initialData = {
              title: res.product.title,
              description: res.product.description,
              price: res.product.price,
              discount: res.product.discount,
              quantity: res.product.quantity,
              category: res.product.category,
              occasion: res.product.occasion,
              imgCover: res.product.imgCover,
              images: res.product.images,
            };

            this.coverPreviewUrl = res.product.imgCover;
            this.galleryPreviewUrls = res.product.images;

            this.productForm.patchValue({
              title: res.product.title,
              description: res.product.description,
              price: res.product.price,
              discount: res.product.discount,
              quantity: res.product.quantity,
              category: res.product.category,
              occasion: res.product.occasion,
            });

            this.productForm.get("imgCover")?.clearValidators();
            this.productForm.get("images")?.clearValidators();
            this.productForm.get("imgCover")?.updateValueAndValidity();
            this.productForm.get("images")?.updateValueAndValidity();

            this.isLoading.set(false);
          },
          error: (err) => {
            console.error("Failed to load product:", err);
            this.isLoading.set(false);
          },
        });
    } else {
      this.isLoading.set(false);
    }
  }

  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.categories);
      },
      error: (err) => {
        console.error("Failed to load categories:", err);
      },
    });
  }

  private loadOccasions(): void {
    this.occasionService.getAllOccasions().subscribe({
      next: (res) => {
        this.occasions.set(res.occasions);
      },
      error: (err) => {
        console.error("Failed to load occasions:", err);
      },
    });
  }


  get priceAfterDiscount(): number {
  const price = this.productForm.get("price")?.value || 0;
  const discount = this.productForm.get("discount")?.value || 0;
  const calculatedPrice = price - price * (discount / 100);
  
  return Math.max(0, calculatedPrice);
}
  

validateDiscountInput(event: any): void {
  const input = event.target;
  let value = input.value;
  
  value = value.replace(/[^\d]/g, '');
  
  let numericValue = parseInt(value, 10);
  
  if (isNaN(numericValue)) {
    this.productForm.patchValue({ discount: '' });
    return;
  }
  
  this.productForm.patchValue({ discount: numericValue });
  
  this.productForm.get('discount')?.markAsTouched();
}

blockMinusKey(event: KeyboardEvent): void {
  if (event.key === '-' || event.key === 'e' || event.key === 'E') {
    event.preventDefault();
  }
}

  onCoverImageSelected(file: File): void {
    this.selectedCoverFile = file;
    this.productForm.patchValue({ imgCover: file });
    this.productForm.get("imgCover")?.markAsTouched();

    const reader = new FileReader();
    reader.onload = () => {
      this.coverPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onGalleryImagesSelected(file: File): void {
    this.selectedGalleryFiles.push(file);
    this.productForm.patchValue({ images: this.selectedGalleryFiles });
    this.productForm.get("images")?.markAsTouched();

    const reader = new FileReader();
    reader.onload = () => {
      this.galleryPreviewUrls.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  openImageModal(imageUrl: string, title: string): void {
    this.modalImageUrl = imageUrl;
    this.modalImageTitle = title;
    this.showImageModal = true;
  }

  getFormTitle(): string {
    const mode = this.isEditMode ? "edit" : "add";
    const modeText = this._translate.instant(`common.modes.${mode}`);

    if (this.isEditMode && this.initialData?.title) {
      const baseTitle = this._translate.instant("products.addEdit.formTitle", { mode: modeText });
      return `${baseTitle}: ${this.initialData.title}`;
    } else {
      return this._translate.instant("products.addEdit.formTitle", { mode: modeText });
    }
  }

  getFieldLabel(field: string): string {
    return this._translate.instant(`products.addEdit.fields.${field}`);
  }

  getFieldPlaceholder(field: string): string {
    return this._translate.instant(`products.addEdit.fields.${field}Placeholder`);
  }

  getSubmitButtonText(): string {
    const mode = this.isEditMode ? "edit" : "add";
    const modeText = this._translate.instant(`common.modes.${mode}`);
    return this._translate.instant("products.addEdit.buttons.submit", { mode: modeText });
  }

  getLoadingText(): string {
    return this._translate.instant("products.addEdit.buttons.saving");
  }

  getImagePreviewText(type: "cover" | "gallery"): string {
    if (type === "cover") {
      return this._translate.instant("products.addEdit.messages.coverPreview");
    } else {
      const count = this.galleryPreviewUrls.length;
      return this._translate.instant("products.addEdit.messages.galleryPreview", { count });
    }
  }

  getNoImageText(type: "cover" | "gallery"): string {
    return this._translate.instant(
      `products.addEdit.messages.no${type.charAt(0).toUpperCase() + type.slice(1)}`,
    );
  }

  getViewImageText(type: "cover" | "gallery"): string {
    return this._translate.instant(
      `products.addEdit.buttons.view${type.charAt(0).toUpperCase() + type.slice(1)}`,
    );
  }

  getPriceAfterDiscountLabel(): string {
    return this._translate.instant("products.addEdit.messages.priceAfterDiscount");
  }

  getCalculatedAutomaticallyText(): string {
    return this._translate.instant("products.addEdit.messages.calculatedAutomatically");
  }

  handleFormSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      formData.append("title", this.productForm.get("title")?.value);
      formData.append("description", this.productForm.get("description")?.value);
      formData.append("price", this.productForm.get("price")?.value);
      formData.append("discount", this.productForm.get("discount")?.value || "0");
      formData.append("quantity", this.productForm.get("quantity")?.value);
      formData.append("category", this.productForm.get("category")?.value);

      if (this.productForm.get("occasion")?.value) {
        formData.append("occasion", this.productForm.get("occasion")?.value);
      }

      if (this.selectedCoverFile) {
        formData.append("imgCover", this.selectedCoverFile);
      }

      if (this.selectedGalleryFiles.length > 0) {
        this.selectedGalleryFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (this.isEditMode && this.productId) {
        this.productsService.updateProduct(this.productId, formData).subscribe({
          next: () => {
            this._messageService.add({
              severity: "success",
              summary: this._translate.instant("common.success"),
              detail: this._translate.instant("products.messages.updateSuccess"),
              life: 3000,
            });
            this.router.navigate(["/dashboard/products"]);
          },
          error: (err) => {
            console.error("Update failed:", err);
            this._messageService.add({
              severity: "error",
              summary: this._translate.instant("common.error"),
              detail: this._translate.instant("products.messages.updateError"),
              life: 5000,
            });
            this.isSubmitting = false;
          },
        });
      } else {
        this.productsService.addProduct(formData).subscribe({
          next: () => {
            this._messageService.add({
              severity: "success",
              summary: this._translate.instant("common.success"),
              detail: this._translate.instant("products.messages.addSuccess"),
              life: 3000,
            });
            this.router.navigate(["/dashboard/products"]);
          },
          error: (err) => {
            console.error("Add failed:", err);
            this._messageService.add({
              severity: "error",
              summary: this._translate.instant("common.error"),
              detail: this._translate.instant("products.messages.addError"),
              life: 5000,
            });
            this.isSubmitting = false;
          },
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach((key) => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

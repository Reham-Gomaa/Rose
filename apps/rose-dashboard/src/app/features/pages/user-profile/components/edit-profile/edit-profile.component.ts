import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslationService, UserDataService } from "@angular-monorepo/services";
// Shared_Components
import {
  CustomInputComponent,
  CustomInputPhoneComponent,
} from "@angular-monorepo/rose-custom-inputs";
import { ConfirmDialogComponent } from "@angular-monorepo/confirm-dialog";
// PrimeNg
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { FileUpload } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { Select } from "primeng/select";
import { SkeletonModule } from "primeng/skeleton";
// Auth_Lib
import { AuthApiKpService, User } from "auth-api-kp";

@Component({
  selector: "app-edit-profile",
  imports: [
    SkeletonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    TranslateModule,
    FileUpload,
    CustomInputComponent,
    CustomInputPhoneComponent,
    Select,
    NgOptimizedImage,
  ],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.scss",
})
export class EditProfileComponent {
  readonly translationService = inject(TranslationService);
  private readonly _translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);

  protected readonly _userDataService = inject(UserDataService);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  user = signal<User | null>(null);
  profileImage: string | ArrayBuffer | null = null;
  defaultPhoto =
    "https://flower.elevateegy.com/uploads/8627d52c-f36a-4613-bade-c16244d9bad1-High_resolution_wallpaper_background_ID_77701218231.jpg";

  @ViewChild("deleteAccountDialog") deleteAccountDialog!: ConfirmDialogComponent;

  genders = [
    { value: "male", label: this._translate.instant("auth.register.gender.male") },
    { value: "female", label: this._translate.instant("auth.register.gender.female") },
  ];

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(\+201|01)[0125][0-9]{8}$/),
    ]),
  });

  ngOnInit(): void {
    this._userDataService.loadUserInfo();
    const user = this._userDataService.user();

    if (user) {
      this.user.set(user);
      this.profileForm.patchValue({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }

  onImageUpload(event: any): void {
    const file = event.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this._messageService.add({
        severity: "error",
        detail: this._translate.instant("messagesToast.fileSizeExceedsLimit"),
      });
      return;
    }

    this._authApiKpService
      .uploadPhoto({ photo: file })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.profilePhotoUploadedSuccessfully"),
          });
          this._userDataService.loadUserInfo();
        },
        error: () => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToUploadProfilePhoto"),
          });
        },
      });
  }

  get formGroup() {
    return this.profileForm;
  }

  get loading() {
    return this.isSaving();
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const formData = this.profileForm.value;

    this._authApiKpService
      .editProfile(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.profileUpdatedSuccessfully"),
          });

          this.isSaving.set(false);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToUpdateProfile"),
          });
          this.isSaving.set(false);
        },
      });
  }

  getInitials(): string {
    const username = this._userDataService.userName()?.trim() || "";
    const parts = username.split(" ").filter(Boolean);

    const first = parts[0]?.charAt(0)?.toUpperCase() || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.charAt(0)?.toUpperCase() : "";

    return `${first}${last}`;
  }
}

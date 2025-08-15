import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
// Translation
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Services
import { StorageManagerService } from "@rose/core_services/storage-manager/storage-manager.service";
import { UserStateService } from "@rose/core_services/user-state/user-state.service";
// Shared_Components
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { ConfirmDialogComponent } from "@rose/shared_Components_business/confirm-dialog/confirm-dialog.component";
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
    FormButtonComponent,
    ConfirmDialogComponent,
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
  private readonly _router = inject(Router);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  user = signal<User | null>(null);
  profileImage: string | ArrayBuffer | null = null;
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
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading.set(true);
    this._authApiKpService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.user.set(response.user);
          this.profileForm.patchValue({
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.email,
            phone: response.user.phone,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToLoadProfileData"),
          });
          this.isLoading.set(false);
        },
      });
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
          this.loadUserProfile();
        },
        error: () => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToUploadProfilePhoto"),
          });
        },
      });
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
        next: (response) => {
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

  onDeleteAccountConfirmed(confirmed: boolean): void {
    if (!confirmed) return;
    this._authApiKpService
      .deleteMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this._storageManagerService.removeItem("authToken");
          this._userStateService.setLoggedIn(false);
          this._messageService.add({
            severity: "success",
            detail: this._translate.instant("messagesToast.accountDeletedSuccessfully"),
          });
          this.user.set(null);
          this._router.navigate(["/dashboard/home"]);
        },
        error: (err) => {
          this._messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToDeleteAccount"),
          });
        },
      });
  }
}

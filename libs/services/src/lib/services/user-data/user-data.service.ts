import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { AuthApiKpService, User } from "auth-api-kp";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageManagerService } from "../storage-manager/storage-manager.service";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  user = signal<User | null>(null);

  isLoggedIn = signal<boolean>(false);
  loading = signal(false);
  userName = signal("Guest");
  userEmail = signal("rose@gmail.com");
  userPhoto = signal("/images/overview/logo.png");
  userGender = signal("Not Specified");
  userPhone = signal("1012345678");
  userID = signal<string>("");
  userRole = signal<string>("");

  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _storageManagerService = inject(StorageManagerService);

  loadUserInfo(): void {
    const token = this._storageManagerService.getItem("authToken");
    if (!token) return;

    this.loading.set(true);
    this._authApiService
      .getProfileData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.user.set(res.user);
          this.userID.set(`${res.user._id}`);
          this.userRole.set(`${res.user.role}`);
          this.userPhoto.set(`${res.user.photo}`);
          this.userName.set(`${res.user.firstName} ${res.user.lastName}`);
          this.userEmail.set(`${res.user.email}`);
          this.userGender.set(`${res.user.gender}`);
          this.userPhone.set(`${res.user.phone}`);

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this._storageManagerService.removeItem("authToken");
          this.isLoggedIn.set(false);
          this.user.set(null);
        },
      });
  }
}

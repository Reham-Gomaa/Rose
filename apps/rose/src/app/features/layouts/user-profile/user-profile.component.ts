import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { AuthApiKpService } from "auth-api-kp";
import { MessageService } from "primeng/api";
import { User } from "auth-api-kp";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [
    SkeletonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    TranslateModule,
    EditProfileComponent,
    ChangePasswordComponent,
  ],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss",
})
export class UserProfileComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  private translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _authApiKpService = inject(AuthApiKpService);
  private readonly _messageService = inject(MessageService);

  apiError = signal<string>("");
  isLoading = signal<boolean>(false);

  activeTab: "profile" | "password" = "profile";

  switchTab(tab: "profile" | "password") {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.onLogout();
  }

  onLogout(): void {}
}

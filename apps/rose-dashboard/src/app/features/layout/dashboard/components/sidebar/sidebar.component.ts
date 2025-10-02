import { StorageManagerService, UserStateService } from "@angular-monorepo/services";
import { Component, DestroyRef, HostListener, inject, PLATFORM_ID, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { environment } from "@rose/environment/baseurl.dev";
import { AuthApiKpService, User } from "auth-api-kp";
import { MessageService } from "primeng/api";
import { UserDataComponent } from "./components/user-data/user-data.component";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive, TranslatePipe, UserDataComponent],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  hidden: boolean = false;
  user = signal<User | null>(null);

  private readonly _translate = inject(TranslateService);
  private readonly _authApiService = inject(AuthApiKpService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _storageManagerService = inject(StorageManagerService);
  private readonly _userStateService = inject(UserStateService);

  changeHidden() {
    this.hidden = !this.hidden;
    console.log(this.hidden);
  }

  goToRose() {
    window.open(`${environment.runUrl}`, "_blank");
  }


}

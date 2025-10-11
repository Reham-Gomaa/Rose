import { Component, inject } from "@angular/core";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";
// RxJS
import { BreadcrumpComponent } from "./components/breadcrump/breadcrump.component";
// Router
import { RouterLink } from "@angular/router";
import { UserPhotoComponent } from "@rose_dashboard/shared_buisness/user-photo/user-photo.component";
import { TranslateToggleComponent, ButtonThemeComponent } from "@angular-monorepo/rose-buttons";
// Services
import { LogoutService } from "@rose_dashboard/core_services/logout/logout.service";

@Component({
  selector: "app-stepper",
  imports: [
    TranslatePipe,
    BreadcrumpComponent,
    RouterLink,
    UserPhotoComponent,
    TranslateToggleComponent,
    ButtonThemeComponent,
  ],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  hidden: boolean = false;

  private readonly _logoutService = inject(LogoutService);

  logout(event?: Event) {
    event?.stopPropagation();
    this._logoutService.logout();
  }

  changeHidden() {
    this.hidden = !this.hidden;
  }
}

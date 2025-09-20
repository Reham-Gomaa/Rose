import { Component, inject } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Services
import { DarkModeService } from "@angular-monorepo/services";
// Components_Shared
import { NotificationToastComponent } from "@angular-monorepo/notification-toast";
import { TranslationService } from "@angular-monorepo/translation";

@Component({
  imports: [RouterOutlet, NotificationToastComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  private translation = inject(TranslationService);
  title = "rose dashboard";
}

import { Component, inject } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Services
import { DarkModeService } from "@angular-monorepo/services";
// Components_Shared
import { NotificationToastComponent } from "@angular-monorepo/notification-toast";

@Component({
  imports: [RouterOutlet, NotificationToastComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  title = "rose dashboard";
}

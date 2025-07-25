import { Component, inject } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Services
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";
// Components_Shared
import { NotificationToastComponent } from "@rose/shared_Components_ui/notification-toast/notification-toast.component";
@Component({
  imports: [RouterOutlet, NotificationToastComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  title = "rose";
}

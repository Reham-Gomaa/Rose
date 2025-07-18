import { Component, inject } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Services
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";
@Component({
  imports: [RouterOutlet],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  title = "rose";
}

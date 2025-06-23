import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DarkModeService } from "./core/services/darkmode/darkmode.service";

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

// @angular
import { Component, inject } from "@angular/core";

// shared-service
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";

@Component({
  selector: "app-separator",
  imports: [],
  templateUrl: "./separator.component.html",
  styleUrl: "./separator.component.scss",
})
export class SeparatorComponent {
   readonly darkModeService = inject(DarkModeService);

  
}

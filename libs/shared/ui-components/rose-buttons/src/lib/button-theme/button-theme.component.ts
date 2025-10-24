import { Component, inject, input } from "@angular/core";
// Services
import { DarkModeService } from "@angular-monorepo/services";
//PrimeNg
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "lib-button-theme",
  imports: [ButtonModule, TooltipModule],
  templateUrl: "./button-theme.component.html",
  styleUrl: "./button-theme.component.scss",
})
export class ButtonThemeComponent {
  spacing = input<boolean>(true);
  darkModeService = inject(DarkModeService);
  toggle() {
    this.darkModeService.toggle();
  }
}

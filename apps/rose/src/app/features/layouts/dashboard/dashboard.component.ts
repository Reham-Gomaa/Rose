import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { fadeTransition } from "../../../core/services/translation/fade.animation";
import { TranslationService } from "../../../core/services/translation/translation.service";
import { LoadingOverlayComponent } from "../../../shared/components/ui/loading-overlay/loading-overlay.component";


@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingOverlayComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  //animations: [fadeTransition]
})
export class DashboardComponent {
    //
}

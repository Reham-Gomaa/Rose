import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { fadeTransition } from "../../../core/services/translation/fade.animation";
import { TranslationService } from "../../../core/services/translation/translation.service";


@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  //animations: [fadeTransition]
})
export class DashboardComponent {
    //
}

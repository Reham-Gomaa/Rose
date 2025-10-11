import { Component } from "@angular/core";
// Router
import { RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";
// Environment
import { environment } from "@rose/environment/baseurl.dev";

@Component({
  selector: "app-bottom-navbar",
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: "./bottom-navbar.component.html",
  styleUrl: "./bottom-navbar.component.scss",
})
export class BottomNavbarComponent {
  goToRose() {
    window.open(`${environment.runUrl}`, "_blank");
  }
}

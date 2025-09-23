import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";
import { environment } from "@rose/environment/baseurl.prod";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  goToRose() {
    window.open(`${environment.runUrl}`, "_blank");
  }
}

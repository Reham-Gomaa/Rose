import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
// Environment
import { environment } from "@rose/environment/baseurl.dev";
// Components
import { UserDataComponent } from "./components/user-data/user-data.component";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink, RouterLinkActive, TranslatePipe, UserDataComponent, NgOptimizedImage],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  hidden: boolean = false;

  changeHidden() {
    this.hidden = !this.hidden;
  }

  goToRose() {
    window.open(`${environment.runUrl}`, "_blank");
  }
}

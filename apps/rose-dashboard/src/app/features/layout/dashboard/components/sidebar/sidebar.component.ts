import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
// Transelate
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {}

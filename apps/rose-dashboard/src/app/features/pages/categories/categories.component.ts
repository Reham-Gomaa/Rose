import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AddandeditComponent } from "./components/addandedit.component";

@Component({
  selector: "app-categories",
  imports: [AddandeditComponent],
  standalone: true,
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {}

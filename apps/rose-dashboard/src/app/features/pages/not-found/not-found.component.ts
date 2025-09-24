import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-not-found",
  imports: [NgOptimizedImage],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
  private _route = inject(Router);
  goToLogin(): void {
    this._route.navigate(["dashboard/overview"]);
  }
}

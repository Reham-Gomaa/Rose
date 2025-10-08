import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-not-found",
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {}

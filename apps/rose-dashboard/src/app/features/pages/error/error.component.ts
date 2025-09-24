import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-error",
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: "./error.component.html",
  styleUrl: "./error.component.scss",
})
export class ErrorComponent {}

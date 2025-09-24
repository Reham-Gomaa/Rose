import { Component, computed, inject } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { ErrorService } from "../../../core/services/error.service";

@Component({
  selector: "app-error",
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: "./error.component.html",
  styleUrl: "./error.component.scss",
})
export class ErrorComponent {
  private errorService = inject(ErrorService);
}

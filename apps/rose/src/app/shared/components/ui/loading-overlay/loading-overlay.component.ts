import { Component, inject } from "@angular/core";
import { TranslationService } from './../../../../core/services/translation/translation.service';

@Component({
  selector: "app-loading-overlay",
  imports: [],
  templateUrl: "./loading-overlay.component.html",
  styleUrl: "./loading-overlay.component.scss",
})
export class LoadingOverlayComponent {
  translationService = inject(TranslationService);
}

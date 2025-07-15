import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";

@Component({
  selector: "app-gallery",
  imports: [TranslatePipe],
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.scss",
  animations: [fadeTransition],
})
export class GalleryComponent {
  translationService = inject(TranslationService);

  images = {
    url: [
      "images/gallery/Frame 74.WebP",
      "images/gallery/Frame 75.WebP",
      "images/gallery/Frame 76.WebP",
      "images/gallery/Frame 77.WebP",
      "images/gallery/Frame 78.WebP",
    ],
  };
}

import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { LazyBackgroundDirective } from "apps/rose/src/app/shared/directives/lazyBackground/lazyBackground.directive";

@Component({
  selector: "app-gallery",
  imports: [TranslatePipe, LazyBackgroundDirective],
  templateUrl: "./gallery.component.html",
  styleUrl: "./gallery.component.scss",
  animations: [fadeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[@fadeTransition]": "translationService.fadeState()",
  },
})
export class GalleryComponent {
  translationService = inject(TranslationService);

  images = {
    url: [
      "images/gallery/Frame 74.AVIF",
      "images/gallery/Frame 75.AVIF",
      "images/gallery/Frame 76.AVIF",
      "images/gallery/Frame 77.AVIF",
      "images/gallery/Frame 78.AVIF",
    ],
  };
}

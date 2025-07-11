import { Component, inject } from "@angular/core";
// Images
import { NgOptimizedImage } from "@angular/common";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";

@Component({
  selector: "app-trusted-by",
  imports: [TranslatePipe, ButtonComponent, NgOptimizedImage],
  templateUrl: "./trustedBy.component.html",
  styleUrl: "./trustedBy.component.scss",
  animations: [fadeTransition],
})
export class TrustedByComponent {
  translationService = inject(TranslationService);

  companyLogos: string[] = [
    "/images/trustedBy/image 36.WebP",
    "/images/trustedBy/image 40.WebP",
    "/images/trustedBy/image 41.WebP",
    "/images/trustedBy/image 38.WebP",
    "/images/trustedBy/image 39.WebP",
    "/images/trustedBy/image 37.WebP",
  ];
}

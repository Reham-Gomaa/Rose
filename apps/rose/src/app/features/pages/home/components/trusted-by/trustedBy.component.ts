import { TranslationService } from './../../../../../core/services/translation/translation.service';
import { fadeTransition } from './../../../../../core/services/translation/fade.animation';
import { Component, inject } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";

@Component({
  selector: "app-trusted-by",
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: "./trustedBy.component.html",
  styleUrl: "./trustedBy.component.scss",
  animations: [fadeTransition]
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

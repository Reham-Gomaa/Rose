import { Component } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";

import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";

@Component({
  selector: "app-trusted-by",
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: "./trustedBy.component.html",
  styleUrl: "./trustedBy.component.scss",
})
export class TrustedByComponent {
  companyLogos: string[] = [
    "/images/trustedBy/image 36.WebP",
    "/images/trustedBy/image 40.WebP",
    "/images/trustedBy/image 41.WebP",
    "/images/trustedBy/image 38.WebP",
    "/images/trustedBy/image 39.WebP",
    "/images/trustedBy/image 37.WebP",
  ];
}

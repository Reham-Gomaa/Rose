import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';
import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-trusted-by',
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: './trustedBy.component.html',
  styleUrl: './trustedBy.component.scss',
})
export class TrustedByComponent {

  public darkMode = inject(DarkModeService);
  companyLogos: string[] = [
    '/images/trustedBy/image 36.png',
    '/images/trustedBy/image 40.png',
    '/images/trustedBy/image 41.png',
    '/images/trustedBy/image 38.png',
    '/images/trustedBy/image 39.png',
    '/images/trustedBy/image 37.png'
  ];

}

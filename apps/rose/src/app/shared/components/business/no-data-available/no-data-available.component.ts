import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from "../../ui/button/button.component";

@Component({
  selector: 'app-no-data-available',
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: './no-data-available.component.html',
  styleUrl: './no-data-available.component.scss'
})
export class NoDataAvailableComponent {
    private readonly _PLATFORM_ID = inject(PLATFORM_ID);

    retryFetch() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      window.location.reload();
    }
  }
}

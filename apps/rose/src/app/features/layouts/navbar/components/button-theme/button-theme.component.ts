import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-button-theme',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './button-theme.component.html',
  styleUrl: './button-theme.component.scss',
})
export class ButtonThemeComponent {
  darkModeService = inject(DarkModeService);

  toggle() {
    this.darkModeService.toggle();
  }
}

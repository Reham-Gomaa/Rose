import { Component, inject } from '@angular/core';
import { DarkModeService } from '../../../core/services/darkmode/darkmode.service';
// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [InputTextModule, ButtonModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public darkMode = inject(DarkModeService);
}

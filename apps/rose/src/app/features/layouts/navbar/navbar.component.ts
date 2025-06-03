import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [ TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly translationService = inject(TranslationService);

  changeLang(lang: string) {
    this.translationService.changeLang(lang);
  }
}

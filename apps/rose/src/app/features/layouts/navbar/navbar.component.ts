import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{
  private readonly translationService = inject(TranslationService);
  
  currentLang !:string;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.changeLang(lang);
  }

  ngOnInit(): void {
    this.currentLang = this.translationService.getCurrentLang()
  }

}

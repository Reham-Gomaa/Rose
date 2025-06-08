import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{
  private readonly translationService = inject(TranslationService);
  private readonly platformId = inject(PLATFORM_ID);
  currentLang !:string;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.changeLang(lang);
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem('lng')){
          this.currentLang = localStorage.getItem('lng')!;
      }else{
        this.currentLang = this.translationService.defaultLang;
      }
    }
  }

}

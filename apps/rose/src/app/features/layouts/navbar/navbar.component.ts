import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation/translation.service';
  

import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// primeNg
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-navbar',
  imports: [Menubar,
    ButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    TranslatePipe ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  btnClass = "loginBtn";
  isLoggedIn:WritableSignal<boolean> = signal<boolean>(false)
  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            route:"home"
        },
        {
            label: 'All Category',
            route:"categories"
        },
        {
            label: 'About',
            route:"about"
        },
        {
            label: 'Contact',
            route:"contact"
        },
    ];

    this.currentLang = this.translationService.getCurrentLang()
  }
  private readonly translationService = inject(TranslationService);
  
  currentLang !:string;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.changeLang(lang);
  }

}

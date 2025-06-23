import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation/translation.service';


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// primeNg
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { ButtonThemeComponent } from './components/button-theme/button-theme.component';
import { SearchModalComponent } from "../../../shared/components/ui/search-modal/search-modal.component";
type modalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright'

@Component({
  selector: 'app-navbar',
  imports: [Menubar,
    ButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    TranslatePipe,
    ButtonThemeComponent,
    Dialog,
    InputTextModule, SearchModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  btnClass = "loginBtn";

  isLoggedIn:WritableSignal<boolean> = signal<boolean>(false)
  private readonly translationService = inject(TranslationService);
  currentLang !:string;
  visible = false;
  inSearch = false;
  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  position: modalPosition = 'center';

  showDialog(position: modalPosition) {
      this.position = position;
      this.visible = true;
  }

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translationService.changeLang(lang);
  }

  openSearch() {
    this.inSearch = true;
    this.searchModal.closeSearch = false
  }

  ngOnInit() {
    this.items = [
      {
        label: 'navbar.home',
        route: "home"
      },
      {
        label: 'navbar.allcategory',
        route: "categories"
      },
      {
        label: 'navbar.about',
        route: "about"
      },
      {
        label: 'navbar.contact',
        route: "contact"
      },
    ];

    this.currentLang = this.translationService.getCurrentLang()
  }
}

import { TranslatePipe } from '@ngx-translate/core';
  

import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// primeNg
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TranslateToggleComponent } from "../../../shared/components/business/translate-toggle/translate-toggle.component";

@Component({
  selector: 'app-navbar',
  imports: [Menubar,
    ButtonModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    TranslatePipe, TranslateToggleComponent],
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
            label: 'navbar.home',
            route:"home"
        },
        {
            label: 'navbar.allcategory',
            route:"categories"
        },
        {
            label: 'navbar.about',
            route:"about"
        },
        {
            label: 'navbar.contact',
            route:"contact"
        },
    ];

  }
  

}

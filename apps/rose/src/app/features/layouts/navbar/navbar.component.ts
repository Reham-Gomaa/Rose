import { CommonModule } from '@angular/common';
import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
    OverlayBadgeModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  btnClass = "loginBtn";
  isLoggedIn:WritableSignal<boolean> = signal<boolean>(true)
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
  }
}

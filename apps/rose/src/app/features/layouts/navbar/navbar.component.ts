
import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from "@angular/core";
// Router
import { RouterLink, RouterLinkActive } from "@angular/router";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations_Translation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Shared_Components
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { SearchModalComponent } from "@rose/shared_Components_ui/search-modal/search-modal.component";
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
// primeNg
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { Menubar } from "primeng/menubar";
import { OverlayBadgeModule } from "primeng/overlaybadge";

type modalPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center"
  | "topleft"
  | "topright"
  | "bottomleft"
  | "bottomright";

@Component({
  selector: "app-navbar",
  imports: [
    Menubar,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    OverlayBadgeModule,
    TranslatePipe,
    ButtonThemeComponent,
    Dialog,
    InputTextModule,
    SearchModalComponent,
    ButtonComponent,
    TranslateToggleComponent,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
  animations: [fadeTransition]
})
export class NavbarComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;
  items: MenuItem[] | undefined;
  btnClass = "loginBtn";
  currentLang!: string;

  visible = false;
  inSearch = false;

  position: modalPosition = "center";

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
    this.searchModal.closeSearch = false;
  }

  ngOnInit() {
    this.items = [
      {
        label: "navbar.home",
        route: "home",
      },
      {
        label: "navbar.allcategory",
        route: "all-categories",
      },
      {
        label: "navbar.about",
        route: "about",
      },
      {
        label: "navbar.contact",
        route: "contact",
      },
    ];
  }
}

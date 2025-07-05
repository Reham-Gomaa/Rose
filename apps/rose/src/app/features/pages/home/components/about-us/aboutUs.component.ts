import { Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Services
import { DarkModeService } from "@rose/core_services/darkmode/darkmode.service";
// Shared_services
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
//PrimeNg
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { RippleModule } from "primeng/ripple";

@Component({
  selector: "app-about-us",
  imports: [ButtonModule, RippleModule, DividerModule, ButtonComponent, TranslatePipe],
  templateUrl: "./aboutUs.component.html",
  styleUrl: "./aboutUs.component.scss",
})
export class AboutUsComponent {
  public darkMode = inject(DarkModeService);
  items = [
    "home.aboutUs.items.item1",
    "home.aboutUs.items.item2",
    "home.aboutUs.items.item3",
    "home.aboutUs.items.item4",
  ];
}

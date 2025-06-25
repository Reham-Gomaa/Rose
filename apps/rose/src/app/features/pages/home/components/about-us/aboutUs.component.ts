import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { DarkModeService } from "../../../../../core/services/darkmode/darkmode.service";
import { ButtonComponent } from "../../../../../shared/components/ui/button/button.component";
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

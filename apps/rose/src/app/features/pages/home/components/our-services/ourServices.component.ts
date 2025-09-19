import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/translation";
// Animations
import { fadeTransition } from "@rose/core_services/fade-out-animation/fade.animation";
// Interfaces
import { ServicesInterface } from "@rose/core_interfaces/services.interface";

@Component({
  selector: "app-our-services",
  imports: [TranslatePipe],
  templateUrl: "./ourServices.component.html",
  styleUrl: "./ourServices.component.scss",
  animations: [fadeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[@fadeTransition]": "translationService.fadeState()",
  },
})
export class OurServicesComponent {
  translationService = inject(TranslationService);

  services: ServicesInterface[] = [
    {
      id: 1,
      icon: "pi pi-truck",
      heading: "home.services.freeDelivery.heading",
      paragraph: "home.services.freeDelivery.paragraph",
    },
    {
      id: 2,
      icon: "pi pi-sync",
      heading: "home.services.getRefund.heading",
      paragraph: "home.services.getRefund.paragraph",
    },
    {
      id: 3,
      icon: "pi pi-wallet",
      heading: "home.services.safePayment.heading",
      paragraph: "home.services.safePayment.paragraph",
    },
    {
      id: 4,
      icon: "pi pi-phone",
      heading: "home.services.support.heading",
      paragraph: "home.services.support.paragraph",
    },
  ];
}

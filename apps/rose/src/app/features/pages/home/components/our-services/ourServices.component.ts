import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ServicesInterface } from '../../../../../core/interfaces/services.interface';
import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';

@Component({
  selector: 'app-our-services',
  imports: [TranslatePipe],
  templateUrl: './ourServices.component.html',
  styleUrl: './ourServices.component.scss',
})
export class OurServicesComponent {

  public darkMode = inject(DarkModeService);

  services: ServicesInterface[] = [
    { id: 1, icon: "pi pi-truck", heading: "home.services.freeDelivery.heading", paragraph: "home.services.freeDelivery.paragraph" },
    { id: 2, icon: "pi pi-sync", heading: "home.services.getRefund.heading", paragraph: "home.services.getRefund.paragraph" },
    { id: 3, icon: "pi pi-wallet", heading: "home.services.safePayment.heading", paragraph: "home.services.safePayment.paragraph" },
    { id: 4, icon: "pi pi-phone", heading: "home.services.support.heading", paragraph: "home.services.support.paragraph" },
  ]
}

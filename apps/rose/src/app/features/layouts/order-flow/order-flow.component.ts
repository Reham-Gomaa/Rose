import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";

// Components
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";

@Component({
  selector: "app-order-flow",
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    TranslatePipe,
    CustomInputComponent,
    FormsModule,
    ButtonComponent,
    BestsellerSliderComponent,
  ],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
})
export class OrderFlowComponent {
  translationService = inject(TranslationService);

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];
}

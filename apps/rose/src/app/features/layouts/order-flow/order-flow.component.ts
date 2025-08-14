import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";

// Components
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";

// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";

@Component({
  selector: "app-order-flow",
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    TranslatePipe,
    CustomInputComponent,
    FormsModule,
    ButtonComponent,
    BestsellerSliderComponent
  ],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
})
export class OrderFlowComponent {
  translationService = inject(TranslationService);

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 },
  ];
}

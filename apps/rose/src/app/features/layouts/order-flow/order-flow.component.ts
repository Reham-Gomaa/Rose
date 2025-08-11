// @angular
import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
// Components
import { BestsellerSliderComponent } from "@rose/shared_Components_ui/bestseller-slider/bestseller-slider.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { selectTotalPrice } from "../../../store/cart/cart-selectors";
import { Observable } from "rxjs";

@Component({
  selector: "app-order-flow",
  imports: [
    RouterOutlet,
    TranslatePipe,
    CustomInputComponent,
    FormsModule,
    ButtonComponent,
    BestsellerSliderComponent,
    AsyncPipe,
  ],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
  animations: [fadeTransition],
})
export class OrderFlowComponent implements OnInit {
  translationService = inject(TranslationService);
  private readonly store = inject(Store);

  totalPrice$!: Observable<number>;

  responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  ngOnInit(): void {
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }
}

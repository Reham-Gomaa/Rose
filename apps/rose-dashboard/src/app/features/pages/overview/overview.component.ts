import { TranslationService } from "@angular-monorepo/translation";
import { Component, inject } from "@angular/core";

@Component({
  selector: "app-overview",
  imports: [],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent {
  private readonly translationService = inject(TranslationService);
}

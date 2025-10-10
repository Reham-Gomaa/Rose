import { Component, inject, Input } from "@angular/core";
// Translation
import { TranslateService } from "@ngx-translate/core";
// PrimeNG
import { ProgressSpinnerModule } from "primeng/progressspinner";
@Component({
  selector: "app-loading",
  imports: [ProgressSpinnerModule],
  templateUrl: "./loading.component.html",
  styleUrl: "./loading.component.scss",
})
export class LoadingComponent {
  private _translate = inject(TranslateService);
  @Input() message = this._translate.instant("loading.message");
}

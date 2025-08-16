import { ChangeDetectionStrategy, Component } from "@angular/core";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Components
import { InputBtnComponent } from "@rose/shared_Components_ui/input-btn/input-btn.component";
// PrimeNG
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-footer",
  imports: [InputTextModule, ButtonModule, TranslatePipe, InputBtnComponent],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  emailValue = "";
}

import { Component } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";

import { InputBtnComponent } from "../../../shared/components/ui/input-btn/input-btn.component";

// PrimeNG
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-footer",
  imports: [InputTextModule, ButtonModule, TranslatePipe, InputBtnComponent],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
})
export class FooterComponent {
  emailValue = "";
}

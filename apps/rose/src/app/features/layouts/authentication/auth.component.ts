import { Component, input, InputSignal } from "@angular/core";
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
import { SeparatorComponent } from "../../../shared/components/auth-separator/separator.component";
import { TranslatePipe } from "@ngx-translate/core";
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-auth",
  imports: [TranslateToggleComponent, SeparatorComponent, TranslatePipe, ButtonThemeComponent, FormButtonComponent, RouterLink],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  process :InputSignal<string> = input('');
  title :InputSignal<string> = input('');
  titleParagraph :InputSignal<string> = input('');
  paragraphSpan :InputSignal<string> = input('');
  heading5 :InputSignal<string> = input('');
  heading3 :InputSignal<string> = input('');
  heading3span :InputSignal<string> = input('');
  button :InputSignal<string> = input('');
}

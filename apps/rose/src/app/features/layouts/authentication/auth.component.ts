import { Component, Input, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
// @ngx
import { TranslatePipe } from "@ngx-translate/core";
// shared-components
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
import { SeparatorComponent } from "@rose/shared_Components_ui/auth-separator/separator.component";
import { ButtonThemeComponent } from "@angular-monorepo/rose-buttons";

@Component({
  selector: "app-auth",
  imports: [
    TranslateToggleComponent,
    SeparatorComponent,
    TranslatePipe,
    ButtonThemeComponent,
    RouterLink,
  ],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  process: InputSignal<string> = input("");
  title: InputSignal<string> = input("");
  titleParagraph: InputSignal<string> = input("");
  paragraphSpan: InputSignal<string> = input("");
  heading5: InputSignal<string> = input("");
  heading3: InputSignal<string> = input("");
  heading3span: InputSignal<string> = input("");
  button: InputSignal<string> = input("");
  formType: InputSignal<any> = input("");

  @Input() goBackToForget: () => void = () => {};
}

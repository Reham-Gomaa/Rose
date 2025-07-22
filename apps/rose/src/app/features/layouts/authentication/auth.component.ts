// @angular
import { Component, inject, input, InputSignal } from "@angular/core";
import { RouterLink } from "@angular/router";

// @ngx
import { TranslatePipe } from "@ngx-translate/core";

// shared-components
import { TranslateToggleComponent } from "@rose/shared_Components_business/translate-toggle/translate-toggle.component";
import { SeparatorComponent } from "@rose/shared_Components_ui/auth-separator/separator.component";
import { ButtonThemeComponent } from "@rose/shared_Components_ui/button-theme/button-theme.component";

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

  // loginForm :FormGroup = new FormGroup({
  //   email: new FormControl(null),
  //   password: new FormControl(null)
  // });

  // registerForm :FormGroup = new FormGroup({
  //   firstName: new FormControl(null),
  //   lastName: new FormControl(null) ,
  //   email: new FormControl(null) ,
  //   password: new FormControl(null) ,
  //   rePassword: new FormControl(null) ,
  //   phone: new FormControl(null) ,
  //   gender: new FormControl(null)
  // });

  // forgetPassForm :FormGroup = new FormGroup({
  //   email: new FormControl(null)
  // });
}

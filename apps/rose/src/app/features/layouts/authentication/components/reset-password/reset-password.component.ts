import { Component, inject, signal } from "@angular/core";
// Translation
import { TranslationService } from "@angular-monorepo/translation";
// Components
import { AuthComponent } from "../../auth.component";
// Components-Flow
import { VerifyCodeComponent } from "./components/verify-code/verify-code.component";
import { SetPasswordComponent } from "./components/set-password/set-password.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
// Interfaces
import { forgetFlowDetails } from "@rose/core_interfaces/forget-flow-details.interface";
// Animations
import { fadeTransition } from "@rose/core_services/fade-out-animation/fade.animation";

@Component({
  selector: "app-reset-password",
  imports: [VerifyCodeComponent, SetPasswordComponent, AuthComponent, ForgetPasswordComponent],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
  animations: [fadeTransition],
})
export class ResetPasswordComponent {
  forgetFlow = signal<"forget" | "verify" | "set">("forget");
  email = signal<string>("");

  readonly translationService = inject(TranslationService);

  details: forgetFlowDetails[] = [
    {
      title: "auth.forget-pass.h1",
      titleParagraph: "auth.forget-pass.paragraph",
      heading3: "auth.forget-pass.h3",
      heading3span: "auth.forget-pass.span",
    },
    {
      title: "auth.verify.h1",
      titleParagraph: "auth.verify.paragraph",
      paragraphSpan: "auth.verify.pSpan",
      heading5: "auth.verify.h5",
      heading3: "auth.verify.h3",
      heading3span: "auth.verify.span",
    },
    {
      title: "auth.reset.h1",
      titleParagraph: "auth.reset.paragraph",
      heading3: "auth.reset.h3",
      heading3span: "auth.reset.span",
    },
  ];

  getDetails() {
    switch (this.forgetFlow()) {
      case "forget":
        return this.details[0];
      case "verify":
        return this.details[1];
      case "set":
        return this.details[2];
      default:
        return this.details[0];
    }
  }

  onEmailSubmitted(email: string) {
    this.email.set(email);
    this.forgetFlow.set("verify");
  }

  onCodeVerified() {
    this.forgetFlow.set("set");
  }

  onPasswordReset() {
    this.email.set("");
    this.forgetFlow.set("forget");
  }

  goBackToForget = () => {
    this.forgetFlow.set("forget");
  };
}

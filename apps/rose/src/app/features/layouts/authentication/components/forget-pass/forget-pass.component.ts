// @angular
import { Component, inject } from "@angular/core";

// @ngx
import { TranslatePipe } from "@ngx-translate/core";

// shared-components
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";

export interface Details {
  title: string
  titleParagraph: string
  paragraphSpan?: string
  heading5?: string
  heading3: string
  heading3span: string
}

@Component({
  selector: "app-forget-pass",
  imports: [AuthComponent, FormButtonComponent, TranslatePipe],
  templateUrl: "./forget-pass.component.html",
  styleUrl: "./forget-pass.component.scss",
  animations: [fadeTransition]
})
export class ForgetPassComponent {
  readonly translationService = inject(TranslationService);

  forgetFlow !: 'forget' | 'verify' | 'reset';
  details !: Details[];

  constructor() {
    this.details = [
      { title: 'auth.forget-pass.h1', titleParagraph: 'auth.forget-pass.paragraph', heading3: 'auth.forget-pass.h3', heading3span: 'auth.forget-pass.span' },
      { title: 'auth.verify.h1', titleParagraph: 'auth.verify.paragraph', paragraphSpan: 'auth.verify.pSpan', heading5: 'auth.verify.h5', heading3: 'auth.verify.h3', heading3span: 'auth.verify.span' },
      { title: 'auth.reset.h1', titleParagraph: 'auth.reset.paragraph', heading3: 'auth.reset.h3', heading3span: 'auth.reset.span' },
    ];
    this.forgetFlow = 'forget';
  }

 getDetails() {
  switch (this.forgetFlow) {
    case 'forget':
      return this.details[1];
    case 'verify':
      return this.details[2];
    case 'reset':
      return this.details[3];
    default:
      return this.details[1];
  }
}

  shiftFlow() {
    if (this.forgetFlow === 'forget') {
      this.forgetFlow = 'verify';
    } else if (this.forgetFlow === 'verify') {
      this.forgetFlow = 'reset'
    } else {
      this.forgetFlow = 'forget'
    }
  }
}

// @angular
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

// @ngx
import { TranslatePipe } from "@ngx-translate/core";

// shared-components
import { FormButtonComponent } from "@rose/shared_Components_ui/form-button/form-button.component";
import { AuthComponent } from "@rose/features_layouts/authentication/auth.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";

// shared-service
import { TranslationService } from "@rose/core_services/translation/translation.service";

// shared-interfaces
import { forgetFlowDetails } from "@rose/core_interfaces/forget-flow-details.interface";

// Animation
import { fadeTransition } from "@rose/core_services/translation/fade.animation";

@Component({
  selector: "app-forget-pass",
  imports: [CustomInputComponent, AuthComponent, FormButtonComponent, TranslatePipe, ReactiveFormsModule],
  templateUrl: "./forget-pass.component.html",
  styleUrl: "./forget-pass.component.scss",
  animations: [fadeTransition]
})
export class ForgetPassComponent {
  readonly translationService = inject(TranslationService);

  forgetFlow !: 'forget' | 'verify' | 'reset';
  details !: forgetFlowDetails[];
  forgetPassForm :FormGroup;
  verifyCodeForm :FormGroup;
  resetPassForm :FormGroup;

  constructor(private fb: FormBuilder) {
    this.details = [
      { title: 'auth.forget-pass.h1', titleParagraph: 'auth.forget-pass.paragraph', heading3: 'auth.forget-pass.h3', heading3span: 'auth.forget-pass.span' },
      { title: 'auth.verify.h1', titleParagraph: 'auth.verify.paragraph', paragraphSpan: 'auth.verify.pSpan', heading5: 'auth.verify.h5', heading3: 'auth.verify.h3', heading3span: 'auth.verify.span' },
      { title: 'auth.reset.h1', titleParagraph: 'auth.reset.paragraph', heading3: 'auth.reset.h3', heading3span: 'auth.reset.span' },
    ];
    this.forgetFlow = 'forget';
  
    this.forgetPassForm = this.fb.group({
      email: ["", [Validators.required]],
    });

    this.verifyCodeForm = this.fb.group({
      resetCode: ["", [Validators.required]],
    });

    this.resetPassForm = this.fb.group({
      email: ["", [Validators.required]],
      newPassword: ["", [Validators.required]]
    });
  }

  submit(){
     console.log(this.forgetPassForm.value);
      console.log(this.forgetPassForm);
      console.log(this.forgetPassForm.get('email'));
  }

 getDetails() {
  switch (this.forgetFlow) {
    case 'forget':
      return this.details[0];
      case 'verify':
        return this.details[1];
        case 'reset':
      return this.details[2];
    default:
      return this.details[0];
  }
}

  shiftFlow() {
    if (this.forgetFlow === 'forget') {
      this.forgetFlow = 'verify';
    } else if (this.forgetFlow === 'verify') {
      this.forgetFlow = 'reset';
    } else {
      this.forgetFlow = 'forget';
    }
  }
}

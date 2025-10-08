import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-contact",
  imports: [ReactiveFormsModule, CustomInputComponent, ButtonComponent, TranslatePipe],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  constructor() {}
}

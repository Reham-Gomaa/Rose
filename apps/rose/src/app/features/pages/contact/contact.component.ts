
import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,   
    CustomInputComponent,
    ButtonComponent,
    TranslatePipe
  ],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  constructor() {
    
  }
}

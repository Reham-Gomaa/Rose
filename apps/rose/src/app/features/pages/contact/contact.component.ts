import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { TranslatePipe } from "@ngx-translate/core";


@Component({
  selector: "app-contact",
  imports: [CustomInputComponent, CommonModule, ReactiveFormsModule, ButtonComponent,TranslatePipe],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  
    contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Add your form submission logic here
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}

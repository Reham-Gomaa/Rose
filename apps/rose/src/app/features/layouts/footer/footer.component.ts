import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  imports: [InputTextModule, ButtonModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent { }

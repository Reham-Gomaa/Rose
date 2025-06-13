import { Component, inject, Input } from '@angular/core';
import { DarkModeService } from '../../../../core/services/darkmode/darkmode.service';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public darkMode = inject(DarkModeService);

  @Input() text!: string;
  @Input() isIcon!: boolean;
  @Input() borderRadius!: string;
  @Input() padding!: string;
  @Input() margin!: string;
  @Input() transition!: string;

}



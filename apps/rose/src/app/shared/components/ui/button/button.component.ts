import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {

  @Input() text!: string;
  @Input() isIcon!: boolean;
  @Input() borderRadius!: string;
  @Input() padding!: string;
  @Input() margin!: string;
  @Input() transition!: string;
}

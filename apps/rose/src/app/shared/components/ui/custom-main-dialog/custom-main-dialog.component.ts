import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-main-dialog',
  imports: [],
  templateUrl: './custom-main-dialog.component.html',
  styleUrl: './custom-main-dialog.component.scss'
})
export class CustomMainDialogComponent {
visable=input.required<boolean>()
@Output() closed = new EventEmitter<void>();


  close(event: MouseEvent) {
    if ((event.target as HTMLElement).id === 'modal-outline') {
      this.closed.emit(); 
    }
  }
}

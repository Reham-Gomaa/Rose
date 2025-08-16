import { Component, inject } from "@angular/core";
// PrimeNg
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";

@Component({
  selector: "app-notification-toast",
  imports: [Toast],
  templateUrl: "./notification-toast.component.html",
  styleUrl: "./notification-toast.component.scss",
})
export class NotificationToastComponent {
  public _messageService = inject(MessageService);
}

import { Component } from "@angular/core";
// Router
import { RouterOutlet } from "@angular/router";
// Components
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
// Primeng
import { MenuItem, MessageService } from "primeng/api";
import { SpeedDialModule } from "primeng/speeddial";
import { ToastModule } from "primeng/toast";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SpeedDialModule, ToastModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [MessageService],
})
export class DashboardComponent {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: "Add",
        icon: "pi pi-pencil",
        command: () => {
          this.messageService.add({ severity: "info", summary: "Add", detail: "Data Added" });
        },
      },
      {
        label: "Update",
        icon: "pi pi-refresh",
        command: () => {
          this.messageService.add({
            severity: "success",
            summary: "Update",
            detail: "Data Updated",
          });
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          this.messageService.add({ severity: "error", summary: "Delete", detail: "Data Deleted" });
        },
      },
      {
        label: "Upload",
        icon: "pi pi-upload",
        command: () => {
          this.router.navigate(["/fileupload"]);
        },
      },
      {
        label: "Angular Website",
        icon: "pi pi-external-link",
        target: "_blank",
        url: "http://angular.io",
      },
    ];
  }
}

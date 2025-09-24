import { Component, input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../button/button.component";
//prime ng
import { TableModule } from "primeng/table";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { occasion } from "@angular-monorepo/occasions";
@Component({
  selector: "app-data-table",
  imports: [CommonModule, TableModule, ButtonComponent, Menu, ButtonModule],
  templateUrl: "./dataTable.component.html",
  styleUrl: "./dataTable.component.scss",
})
export class DataTableComponent {
  data = input.required<occasion[] | any[]>();
  records = input.required<string[]>();
  items: MenuItem[] | undefined;

  ngOnInit() {
    console.log(this.data());
    this.items = [
      {
        label: "",
        items: [
          {
            label: "Edit",
            icon: "pi pi-pencil",
          },
          {
            label: "Remove",
            icon: "pi pi-trash",
          },
        ],
      },
    ];
  }
}

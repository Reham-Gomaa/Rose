import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../button/button.component";
//prime ng
import { TableModule } from "primeng/table";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { Skeleton } from "primeng/skeleton";
// Your custom component
import { ConfirmDialogComponent } from "@angular-monorepo/confirm-dialog";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-data-table",
  imports: [
    CommonModule,
    TableModule,
    ButtonComponent,
    Menu,
    ButtonModule,
    Skeleton,
    ConfirmDialogComponent,
    TranslatePipe,
  ],
  templateUrl: "./dataTable.component.html",
  styleUrl: "./dataTable.component.scss",
})
export class DataTableComponent {
  data = input.required<any[]>();
  records = input.required<string[]>();
  entityType = input<string>("item");

  items: MenuItem[] | undefined;
  edit = output<any>();
  delete = output<any>();

  showConfirmDialog = false;
  itemToDelete: any = null;
  selectedItem: any = null;

  // ADD THIS MAPPING METHOD
  getDisplayValue(item: any, record: string): any {
    const fieldMappings: { [key: string]: string } = {
      // Products mappings
      name: "title",
      stock: "quantity",
      sales: "sold",
      ratings: "rateAvg",

      products: "productsCount",
    };

    if (record === "name") {
      return item["title"] || item["name"];
    }

    const actualProperty = fieldMappings[record] || record;
    return item[actualProperty];
  }

  ngOnInit() {
    this.items = [
      {
        label: "",
        items: [
          {
            label: "Edit",
            icon: "pi pi-pencil",
            command: () => {
              if (this.selectedItem) {
                this.onEdit(this.selectedItem);
              }
            },
          },
          {
            label: "Remove",
            icon: "pi pi-trash",
            command: () => {
              if (this.selectedItem) {
                this.confirmDelete(this.selectedItem);
              }
            },
          },
        ],
      },
    ];
  }

  onMenuClick(menu: Menu,event:MouseEvent, item: any) {
    menu.toggle(event);
    this.selectedItem = item;
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
    this.showConfirmDialog = false;
    this.itemToDelete = null;
  }

  confirmDelete(item: any) {
    this.itemToDelete = item;
    this.showConfirmDialog = true;
  }

  onDialogConfirmed(confirmed: boolean) {
    if (confirmed && this.itemToDelete) {
      this.onDelete(this.itemToDelete);
    } else {
      this.showConfirmDialog = false;
      this.itemToDelete = null;
    }
  }
}

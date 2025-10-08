
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

@Component({
  selector: "app-data-table",
  imports: [
    CommonModule, 
    TableModule, 
    ButtonComponent, 
    Menu, 
    ButtonModule, 
    Skeleton,
    ConfirmDialogComponent 
  ],
  templateUrl: "./dataTable.component.html",
  styleUrl: "./dataTable.component.scss"
})
export class DataTableComponent {
  data = input.required<any[]>();
  records = input.required<string[]>();
  entityType = input<string>('item');
  
  items: MenuItem[] | undefined;
  edit = output<any>();
  delete = output<any>();
  
  
  showConfirmDialog = false;
  itemToDelete: any = null;

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
            }
          },
          {
            label: "Remove",
            icon: "pi pi-trash",
            command: () => {
              if (this.selectedItem) {
                this.confirmDelete(this.selectedItem);
              }
            }
          },
        ],
      },
    ];
  }

  selectedItem: any = null;

  onMenuClick(event: any, item: any) {
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
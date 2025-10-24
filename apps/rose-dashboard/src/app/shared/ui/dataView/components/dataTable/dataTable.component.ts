import { Component, computed, inject, input, output } from "@angular/core";
//prime ng
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Menu } from "primeng/menu";
import { Skeleton } from "primeng/skeleton";
import { TableModule } from "primeng/table";
// Your custom component
import { ConfirmDialogComponent } from "@angular-monorepo/confirm-dialog";
import { ButtonComponent } from "../../../button/button.component";
// Pipes
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { LoadingService } from "@rose_dashboard/shared_services/loading/loading.service";

@Component({
  selector: "app-data-table",
  imports: [
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
  private _translateService = inject(TranslateService);
  private _loadService = inject(LoadingService);

  data = input.required<any[]>();
  records = input.required<string[]>();
  entityType = input<string>("item");

  items: MenuItem[] | undefined;
  edit = output<any>();
  delete = output<any>();

  showConfirmDialog = false;
  itemToDelete: any = null;
  selectedItem: any = null;

  apiLoaded = computed(() => this._loadService.itemsLoaded());

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
    this.loadMenu();
    this._translateService.onLangChange.subscribe(() => {
      this.loadMenu();
    });
  }
  loadMenu() {
    this.items = [
      {
        label: "",
        items: [
          {
            label: this._translateService.instant("ACTIONS.EDIT"),
            icon: "pi pi-pencil",
            iconStyle: {
              color: "var(--edit-btn-color)",
            },

            command: () => {
              if (this.selectedItem) {
                this.onEdit(this.selectedItem);
              }
            },
          },
          {
            label: this._translateService.instant("ACTIONS.REMOVE"),
            icon: "pi pi-trash",
            iconStyle: {
              color: "var(--remove-btn-color)",
            },
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

  onMenuClick(menu: Menu, event: MouseEvent, item: any) {
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

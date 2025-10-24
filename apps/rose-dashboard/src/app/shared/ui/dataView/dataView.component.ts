import { CommonModule } from "@angular/common";
import { Component, computed, inject, input, output, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonComponent } from "../button/button.component";

//primeNg
import { TableModule } from "primeng/table";
import { DataTableComponent } from "./components/dataTable/dataTable.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
//lib
import { occasion } from "@angular-monorepo/occasions";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
//pipes
import { TranslatePipe } from "@ngx-translate/core";
import { PagPipePipe } from "./pipes/paginationPipe/pagPipe.pipe";
import { SearchPipe } from "./pipes/searchPipe/search.pipe";
import { Product } from "@angular-monorepo/products";
import { Category } from "@angular-monorepo/categories";
import { LoadingService } from "@rose_dashboard/shared_services/loading/loading.service";

export type dataTypes = occasion[] | any[];

@Component({
  selector: "app-data-view",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TableModule,
    DataTableComponent,
    PaginationComponent,
    PagPipePipe,
    SearchPipe,
    CustomInputComponent,
    TranslatePipe,
  ],
  templateUrl: "./dataView.component.html",
  styleUrl: "./dataView.component.scss",
})
export class DataViewComponent {
  data_items = input.required<occasion[] | Product[] | Category[]>();
  table_records = input.required<string[]>();
  entityType = input<string>("item");
  public _r = inject(Router);

  currentData = signal<string>(this._r.url.split("/")[this._r.url.split("/").length - 1]);
  firstIndex: number = 0;
  numOfRows: number = 6;
  searchWord = "";
  searchInput = new FormControl("", Validators.required);
  addNew = output<void>();
  editItem = output<any>();
  deleteItem = output<any>();

  getPage(pagData: { first: number; rows: number }) {
    this.firstIndex = pagData.first;
    this.numOfRows = pagData.rows;
  }
  // Add these methods
  navigateToAdd() {
    this.addNew.emit();
  }

  onEdit(item: any) {
    this.editItem.emit(item);
  }
  onDelete(item: any) {
    this.deleteItem.emit(item);
  }
  ngOnInit() {
    this.searchInput.valueChanges.subscribe({
      next: (v) => {
        this.searchWord = v ?? "";
      },
    });
  }
}

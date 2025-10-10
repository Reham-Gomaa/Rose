import { Component, inject, input, output, Output, signal } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

//primeNg
import { TableModule } from "primeng/table";
import { DataTableComponent } from "./components/dataTable/dataTable.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
//lib
import { occasion } from "@angular-monorepo/occasions";
import { CustomInputComponent } from "@angular-monorepo/rose-custom-inputs";
//pipes
import { PagPipePipe } from "./pipes/paginationPipe/pagPipe.pipe";
import { SearchPipe } from "./pipes/searchPipe/search.pipe";
import { EventEmitter } from "stream";
import { TransplantedType } from "@angular/compiler";
import { TranslatePipe } from "@ngx-translate/core";

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
    TranslatePipe
  ],
  templateUrl: "./dataView.component.html",
  styleUrl: "./dataView.component.scss",
})
export class DataViewComponent {
  data_items = input.required<occasion[] | any[]>();
  table_records = input.required<string[]>();
    entityType = input<string>('item');
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

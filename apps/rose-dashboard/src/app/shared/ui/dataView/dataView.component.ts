import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";
//custom input
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

//primeNg
import { TableModule } from 'primeng/table';
import { DataTableComponent } from "./components/dataTable/dataTable.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

@Component({
  selector: "app-data-view",
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, TableModule, DataTableComponent, PaginationComponent],
  templateUrl: "./dataView.component.html",
  styleUrl: "./dataView.component.scss",
})
export class DataViewComponent {
  products = [
  { code: 'P001', name: 'T-Shirt'},
  { code: 'P002', name: 'Laptop'},
  { code: 'P003', name: 'Coffee Mug' },
  { code: 'P004', name: 'Running Shoes'},
  { code: 'P005', name: 'Headphones'},
];

  records:string[] = [
    'Name' , 'Products'
  ]

  searchInput = new FormControl("",Validators.required)

}

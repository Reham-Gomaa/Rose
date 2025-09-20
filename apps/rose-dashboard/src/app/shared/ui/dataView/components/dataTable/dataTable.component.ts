import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonComponent } from "../../../button/button.component";

@Component({
  selector: "app-data-table",
  imports: [CommonModule,TableModule,ButtonComponent],
  templateUrl: "./dataTable.component.html",
  styleUrl: "./dataTable.component.scss",
})
export class DataTableComponent {

  products = input.required<any[]>()
  records = input.required<string[]>() 



}

import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorModule, PaginatorState } from "primeng/paginator";

@Component({
  selector: "app-pagination",
  imports: [CommonModule, PaginatorModule],
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.scss",
})
export class PaginationComponent {
  first: number = 0;
  rows: number = 6;
  totalDataSize = input.required<number>()
  currentPage = output<{
    first: number;
    rows: number;
  }>();
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    this.currentPage.emit({
      first: this.first,
      rows: this.rows,
    });
  }
}

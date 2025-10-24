import { Component, inject, signal, WritableSignal } from "@angular/core";
import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
//lib
import { OccasionService, occasion } from "@angular-monorepo/occasions";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { LoadingService } from "@rose_dashboard/shared_services/loading/loading.service";

@Component({
  selector: "app-occasions",
  imports: [DataViewComponent],
  templateUrl: "./occasions.component.html",
  styleUrl: "./occasions.component.scss",
})
export class OccasionsComponent {
  private occasion_service = inject(OccasionService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private _loadService = inject(LoadingService);

  table_header_records: string[] = ["name", "productsCount"];
  occasions: WritableSignal<occasion[]> = signal<occasion[]>([]);

  ngOnInit() {
    this._loadService.itemsLoaded.set(false);
    this.occasion_service.getAllOccasions().subscribe({
      next: (res) => {
        this.occasions.set(res.occasions);
        this._loadService.itemsLoaded.set(true);
      },
    });
  }

  onAddNew() {
    this.router.navigate(["dashboard/occasions/add"]);
  }

  onEditOccasion(occasion: occasion) {
    this.router.navigate([`dashboard/occasions/edit/${occasion._id}`]);
  }
  onDeleteOccasion(occasion: occasion) {
    this.occasion_service.deleteOccasion(occasion._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          detail: "Category deleted successfully!",
          life: 3000,
        });
        this.loadCategories(); // Refresh the list
      },
      error: (err) => {
        console.error("Delete failed:", err);
        this.messageService.add({
          severity: "error",
          detail: "Failed to delete category. Please try again.",
          life: 5000,
        });
      },
    });
  }
  private loadCategories() {
    this.occasion_service.getAllOccasions().subscribe({
      next: (res) => {
        this.occasions.set(res.occasions);
      },
    });
  }
}

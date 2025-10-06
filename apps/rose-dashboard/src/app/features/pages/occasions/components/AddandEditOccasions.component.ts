import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OccasionService } from "@angular-monorepo/occasions"; 
import { SingleOccasionRes } from "@angular-monorepo/occasions"; 
import { CategoryOccasionFormComponent } from "apps/rose-dashboard/src/app/shared/buisness/category-occasion-form/category-occasion-form.component";
import { MessageService } from "primeng/api";
import { Skeleton } from "primeng/skeleton";
import { Subject, takeUntil } from "rxjs";
import { TranslateModule,TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-edit-occasion",
  standalone: true,
  imports: [CategoryOccasionFormComponent,Skeleton, TranslateModule],
 templateUrl: "./AddandEditOccasions.component.html",
  styleUrl: "./AddandEditOccasions.component.scss",
})
export class AddEditOccasionComponent {
  private _messageService = inject(MessageService);
  private _translate = inject(TranslateService);
  isEditMode = false;
  occasionId: string | null = null;
  initialData: any = null;
  isLoading = signal(true);
  private destroy$ = new Subject<void>();

  constructor(
    private occasionService: OccasionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.occasionId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.occasionId;

    if (this.isEditMode && this.occasionId) {
      this.occasionService.getOccasionById(this.occasionId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: SingleOccasionRes) => {
          this.initialData = {
            name: res.occasion.name,
            image: res.occasion.image,
          };
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load occasion:', err);
          this.isLoading.set(false);
        }
      });
    } else {
      this.isLoading.set(false);
    }
  }

  handleFormSubmit(formData: FormData): void {
    if (this.isEditMode && this.occasionId) {
      this.occasionService.updateOccasion(this.occasionId, formData).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            detail: "Occasion updated successfully!",
            life: 3000,
          });
          this.router.navigate(["/dashboard/occasions"]);
        },
        error: (err) => {
          console.error("Update failed:", err);
          this._messageService.add({
            severity: "error",
            detail: "Failed to update occasion. Please try again.",
            life: 5000,
          });
        },
      });
    } else {
      this.occasionService.addOccasion(formData).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            detail: "Occasion added successfully!",
            life: 3000,
          });
          this.router.navigate(["/dashboard/occasions"]);
        },
        error: (err) => {
          console.error("Add failed:", err);
          this._messageService.add({
            severity: "error",
            detail: "Failed to add occasion. Please try again.",
            life: 5000,
          });
        },
      });
    }
  }
   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
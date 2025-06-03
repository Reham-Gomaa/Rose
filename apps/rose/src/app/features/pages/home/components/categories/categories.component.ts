import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { CategoryRes, Category } from '../../../../../core/interfaces/categories.interface';

// PrimeNG
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Skeleton } from 'primeng/skeleton';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ToastModule, Skeleton, TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  subCategories: Subscription = new Subscription();
  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.isLoading.set(true);

    this.subCategories.add(this.categoriesService.getAllCategories().subscribe({
      next: (response: CategoryRes) => {
        this.categories.set(response.categories || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.hasError.set(true);
        this.isLoading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories'
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subCategories.unsubscribe();
  }


}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { CategoryRes, Category } from '../../../../../shared/interface/categories';

@Component({
  selector: 'app-categories',
  imports: [ToastModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);

  // Typed signals
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
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
    });
  }
}

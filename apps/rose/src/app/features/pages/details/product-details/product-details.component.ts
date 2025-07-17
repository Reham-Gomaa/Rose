import { Component, InputSignal, input, signal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../../core/interfaces/carditem.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DialogModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productDetails = input.required<Product>();
  currentImage = signal<string>('');
  showModal = signal<boolean>(false);

  constructor() {
    // Watch for input changes
    effect(() => {
      if (this.productDetails()) {
        this.currentImage.set(this.productDetails().imgCover);
      }
    });
  }

  onThumbnailClick(image: string): void {
    this.currentImage.set(image);
  }

  openImageModal(): void {
    // this.currentImage.set(image);
    this.showModal.set(true);
  }
}
import { Component,input, signal, effect } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
//interfaces
import { Product } from '@rose/core_interfaces/carditem.interface';
// PrimeNG
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ NgOptimizedImage, DialogModule],
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

    this.showModal.set(true);
  }
}

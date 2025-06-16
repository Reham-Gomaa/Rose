import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-gallery',
  imports: [TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images = {
    url: [
      'images/gallery/Frame 74.WebP',
      'images/gallery/Frame 75.WebP',
      'images/gallery/Frame 76.WebP',
      'images/gallery/Frame 77.WebP',
      'images/gallery/Frame 78.WebP',],
  }


}

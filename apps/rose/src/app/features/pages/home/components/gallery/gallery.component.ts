import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images = {
    url: [
      'images/gallery/Frame 74.png',
      'images/gallery/Frame 75.png',
      'images/gallery/Frame 76.png',
      'images/gallery/Frame 77.png',
      'images/gallery/Frame 78.png',],
  }


}

import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';

@Component({
  selector: 'app-gallery',
  imports: [TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  public darkMode = inject(DarkModeService);
  images = {
    url: [
      'images/gallery/Frame 74.png',
      'images/gallery/Frame 75.png',
      'images/gallery/Frame 76.png',
      'images/gallery/Frame 77.png',
      'images/gallery/Frame 78.png',],
  }


}

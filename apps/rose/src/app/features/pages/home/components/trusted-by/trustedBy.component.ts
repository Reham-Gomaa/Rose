import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  imports: [],
  templateUrl: './trustedBy.component.html',
  styleUrl: './trustedBy.component.scss',
})
export class TrustedByComponent {


   companyLogos: string[] = [
    '/images/image 36.png',
    '/images/image 40.png',
    '/images/image 41.png',
    '/images/image 38.png',
    '/images/image 39.png',
    '/images/image 37.png'
  ];
  
}

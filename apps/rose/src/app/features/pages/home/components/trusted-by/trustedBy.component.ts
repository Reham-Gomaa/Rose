import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  imports: [],
  templateUrl: './trustedBy.component.html',
  styleUrl: './trustedBy.component.scss',
})
export class TrustedByComponent {


   companyLogos: string[] = [
    '/images/trustedBy/image 36.png',
    '/images/trustedBy/image 40.png',
    '/images/trustedBy/image 41.png',
    '/images/trustedBy/image 38.png',
    '/images/trustedBy/image 39.png',
    '/images/trustedBy/image 37.png'
  ];
  
}

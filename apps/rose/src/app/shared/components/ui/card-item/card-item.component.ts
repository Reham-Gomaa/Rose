import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/carditem.interface';

//PrimeNg
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-item',
  imports: [CommonModule, RatingModule ,FormsModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  @Input() productInfo!: Product;
}

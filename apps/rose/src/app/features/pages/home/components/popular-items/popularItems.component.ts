import { Component } from '@angular/core';
import { CardItemComponent } from "../../../../../shared/components/ui/card-item/card-item.component";
import { ICardItem } from '../../../../../core/interface/carditem.interface';


@Component({
  selector: 'app-popular-items',
  imports: [CardItemComponent],
  templateUrl: './popularItems.component.html',
  styleUrl: './popularItems.component.scss',
})
export class PopularItemsComponent {

  categories = ['all', 'home', 'garment', 'gifts', 'occasion'];

  cards: ICardItem[] = [
    { id: 1, imageUrl: '/images/image 23.png', title: 'Special Gift Box', price: 250.00, rating: 4 },
    { id: 2, imageUrl: '/images/image 23.png', title: 'Luxury Headphones', price: 199.99, rating: 5 },
    { id: 3, imageUrl: '/images/image 23.png', title: 'Designer Watch', price: 349.50, rating: 4 },
    { id: 4, imageUrl: '/images/image 23.png', title: 'Premium Perfume', price: 129.99, rating: 3 },
    { id: 5, imageUrl: '/images/image 23.png', title: 'Smart Speaker', price: 179.00, rating: 4 },
    { id: 6, imageUrl: '/images/image 23.png', title: 'Wireless Earbuds', price: 89.99, rating: 5 },
    { id: 7, imageUrl: '/images/image 23.png', title: 'Leather Wallet', price: 59.95, rating: 4 },
    { id: 8, imageUrl: '/images/image 23.png', title: 'Sunglasses', price: 149.00, rating: 4 }
  ];

  get filteredCards(): ICardItem[] {
    return this.cards;
  }

}

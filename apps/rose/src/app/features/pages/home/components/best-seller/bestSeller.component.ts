import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BestSellerService } from 'apps/rose/src/app/shared/services/best-seller/best-seller.service';
import { CardItemComponent } from 'apps/rose/src/app/shared/components/ui/card-item/card-item.component';
import { BestSeller, BestSellerRes } from 'apps/rose/src/app/core/interfaces/best-seller';
import { ICardItem } from 'apps/rose/src/app/core/interfaces/carditem.interface';
import { ButtonComponent } from 'apps/rose/src/app/shared/components/ui/button/button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, CardItemComponent,ButtonComponent],
  templateUrl: './bestSeller.component.html',
  styleUrls: ['./bestSeller.component.scss']
})
export class BestSellerComponent implements OnInit {

  private readonly bestsellerService = inject(BestSellerService);
  bestSellers: BestSeller[] = [];
  private subscription: Subscription | undefined;

    responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.getBestSellersData();
  }


  getBestSellersData(): void {
  this.subscription = this.bestsellerService.getBestSellers().subscribe({
    next: (res: BestSellerRes) => {
      this.bestSellers = res.bestSeller;
    },
    error: (err) => console.log(err),
  });
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe(); 
}


   mapToCardItem(b: BestSeller): ICardItem {
    return {
      id: +b.id,
      imageUrl: b.imgCover,
      title: b.title,
      price: b.priceAfterDiscount || b.price,
      rating: b.rateAvg
    };
  }

  
}
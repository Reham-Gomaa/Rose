import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BestSellerService } from 'apps/rose/src/app/shared/services/best-seller/best-seller.service';
import { CardItemComponent } from 'apps/rose/src/app/shared/components/ui/card-item/card-item.component';
import { BestSeller, BestSellerRes } from 'apps/rose/src/app/core/interface/best-seller';
import { ICardItem } from 'apps/rose/src/app/core/interface/carditem.interface';
import { ButtonComponent } from 'apps/rose/src/app/shared/components/ui/button/button.component';

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
    this.bestsellerService.getBestSellers().subscribe({
      next: (res:BestSellerRes) => {
        console.log(res.bestSeller);
        this.bestSellers = res.bestSeller;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
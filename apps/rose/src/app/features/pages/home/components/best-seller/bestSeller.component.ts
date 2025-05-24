import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CardItemComponent } from '../../../../../shared/components/ui/card-item/card-item.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

//PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BestSellerService } from '../../../../../shared/services/best-seller/best-seller.service';
import { BestSeller, BestSellerRes } from '../../../../../core/interfaces/best-seller';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CarouselModule, ButtonModule, CardItemComponent, ButtonComponent],
  templateUrl: './bestSeller.component.html',
  styleUrls: ['./bestSeller.component.scss']
})
export class BestSellerComponent implements OnInit, OnDestroy {

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







}

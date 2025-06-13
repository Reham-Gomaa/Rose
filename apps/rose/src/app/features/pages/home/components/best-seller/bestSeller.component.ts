import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription, take, timer } from 'rxjs';

import { CardItemComponent } from '../../../../../shared/components/ui/card-item/card-item.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

import { DarkModeService } from '../../../../../core/services/darkmode/darkmode.service';
//PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BestSellerService } from '../../../../../shared/services/best-seller/best-seller.service';
import { BestSeller, BestSellerRes } from '../../../../../core/interfaces/best-seller';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-best-seller',
  imports: [CarouselModule, ButtonModule, CardItemComponent, ButtonComponent, SkeletonModule, TranslatePipe],
  templateUrl: './bestSeller.component.html',
  styleUrls: ['./bestSeller.component.scss']
})
export class BestSellerComponent implements OnInit, OnDestroy {

  public darkMode = inject(DarkModeService);
  private readonly bestsellerService = inject(BestSellerService);

  bestSellers = signal<BestSeller[]>([]);
  showSkeleton = signal(true);
  loading = signal(true);
  skeletonItems = signal(Array(1).fill(0));

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
    this.loadBestSellers();
  }
  loadBestSellers(): void {
    this.loading.set(true);
    this.showSkeleton.set(true);


    this.subscription = this.bestsellerService.getBestSellers().subscribe({
      next: (res: BestSellerRes) => {
        this.bestSellers.set(res.bestSeller || []);
        this.loading.set(false);
        this.showSkeleton.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
          this.showSkeleton.set(false);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

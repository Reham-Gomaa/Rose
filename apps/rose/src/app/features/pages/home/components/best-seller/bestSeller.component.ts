import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { Subscription, take, timer } from 'rxjs';

import { CardItemComponent } from '../../../../../shared/components/ui/card-item/card-item.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

//PrimeNg
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { BestSellerService } from '../../../../../shared/services/best-seller/best-seller.service';
import { BestSeller, BestSellerRes } from '../../../../../core/interfaces/best-seller';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CarouselModule, ButtonModule, CardItemComponent, ButtonComponent, SkeletonModule, TranslatePipe],
  templateUrl: './bestSeller.component.html',
  styleUrls: ['./bestSeller.component.scss']
})
export class BestSellerComponent implements OnInit, OnDestroy {

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

    // Start a 3-second timer (changed from your 5s to match your code)
    const minLoadingTimer = timer(3000).pipe(take(1));

    this.subscription = this.bestsellerService.getBestSellers().subscribe({
      next: (res: BestSellerRes) => {
        this.bestSellers.set(res.bestSeller || []);
        this.loading.set(false);

        // Only hide skeleton after both data loads AND 3 seconds pass
        minLoadingTimer.subscribe(() => {
          this.showSkeleton.set(false);
        });
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        minLoadingTimer.subscribe(() => {
          this.showSkeleton.set(false);
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

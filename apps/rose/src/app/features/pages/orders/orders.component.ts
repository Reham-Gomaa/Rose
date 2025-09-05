import { Component, inject, OnInit } from "@angular/core";
import { CurrencyPipe, DatePipe, NgOptimizedImage } from "@angular/common";
import { RouterModule } from "@angular/router";
//Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// PrimeNG
import { PrimeIcons } from "primeng/api";
//Interfaces
import { OrderItem, OrderRes, Orders } from "@rose/core_interfaces/orders";
import { Product } from "@angular-monorepo/products";
// Shared Services
import { OrdersService } from "@rose/shared_services/orders/orders.service";
// RxJS
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-orders",
  imports: [NgOptimizedImage, RouterModule, TranslatePipe],
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  providers: [DatePipe, CurrencyPipe],
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = [];
  expandedOrders: Set<string> = new Set();
  PrimeIcons = PrimeIcons;
  private destroy$ = new Subject<void>();

  constructor(private ordersService: OrdersService, private datePipe: DatePipe) {}
  translationService = inject(TranslationService);

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadOrders(): void {
    this.ordersService
      .getUserOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: OrderRes) => {
          this.orders = response.orders;
          console.log(this.orders);
        },
        error: (error) => {
          console.error("Error loading orders:", error);
        },
      });
  }

  isExpanded(orderId: string): boolean {
    return this.expandedOrders.has(orderId);
  }

  toggleShowAll(orderId: string): void {
    if (this.isExpanded(orderId)) {
      this.expandedOrders.delete(orderId);
    } else {
      this.expandedOrders.add(orderId);
    }
  }

  formatDate(date: Date): string {
    const dateOnly = this.datePipe.transform(date, "d MMMM, y") || "";
    const timeOnly = this.datePipe.transform(date, "h:mm a") || "";
    const atWord = this.translationService.instant("orders.at");

    return `${dateOnly} ${atWord} ${timeOnly}`;
  }

  getProductRating(product: Product): string {
    if (!product.rateCount) {
      return this.translationService.instant("orders.notRatedYet");
    }
    return `${(product.rateAvg || 0).toFixed(1)}/5`;
  }

  calculateItemTotal(item: OrderItem): number {
    return item.price * item.quantity;
  }

  shouldShowItem(totalItems: number, index: number, orderId: string): boolean {
    if (totalItems <= 2) {
      return true;
    }

    if (this.isExpanded(orderId)) {
      return true;
    }

    return index < 4;
  }

  isSemiVisible(totalItems: number, index: number, orderId: string): boolean {
    if (totalItems < 3 || this.isExpanded(orderId)) {
      return false;
    }

    return index == 2 || index == 3;
  }
}

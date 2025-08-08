// import { Component, OnInit, inject } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { OrdersService } from "@rose/shared_services/orders/orders.service";
// import { Orders, OrderRes } from "@rose/core_interfaces/orders";
// import { NavbarComponent } from "@rose/features_layouts/navbar/navbar.component";
// import { FooterComponent } from "@rose/features_layouts/footer/footer.component";

// @Component({
//   selector: "app-orders",
//   standalone: true,
//   imports: [CommonModule, NavbarComponent, FooterComponent],
//   templateUrl: "./orders.component.html",
//   styleUrls: ["./orders.component.scss"],
// })
// export class OrdersComponent implements OnInit {
//   orders: Orders[] = [];
//   // track expansion per order id (no interface changes)
//   expandedOrders: { [orderId: string]: boolean } = {};

//   private readonly ordersService = inject(OrdersService);

//   ngOnInit(): void {
//     this.loadFromApi();
//   }

//   private loadFromApi(): void {
//     this.ordersService.getUserOrders().subscribe({
//       next: (res: OrderRes) => {
//         // get the orders array from the response
//         this.orders = res && res.orders ? res.orders : [];
//         // initialize expansion state
//         this.orders.forEach(o => (this.expandedOrders[o._id] = false));
//       },
//       error: (err) => {
//         console.error("Failed to load orders:", err);
//       }
//     });
//   }

//   // toggle with immutable update so Angular reliably detects change
//   toggleShowAll(orderId: string): void {
//     this.expandedOrders = { ...this.expandedOrders, [orderId]: !this.expandedOrders[orderId] };
//   }

//   isExpanded(orderId: string): boolean {
//     return !!this.expandedOrders[orderId];
//   }

//   // returns either first 4 or all items (returns new array to ensure re-render)
//   getVisibleOrderItems(order: Orders) {
//     return this.isExpanded(order._id) ? order.orderItems.slice() : order.orderItems.slice(0, 4);
//   }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@rose/features_layouts/navbar/navbar.component';
import { FooterComponent } from '@rose/features_layouts/footer/footer.component';

interface Product {
  _id: string;
  title: string;
  imgCover: string;
  rateAvg?: number;
  rateCount?: number;
}

interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface Orders {
  _id: string;
  orderNumber: string;
  createdAt: Date;
  totalPrice: number;
  isPaid: boolean;
  state: 'done' | 'in progress' | 'cancelled';
  paymentType: string;
  isDelivered: boolean;
  orderItems: OrderItem[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  orders: Orders[] = [
    // Order with 1 item (shows fully)
    {
      _id: 'order1',
      orderNumber: 'ORD-1001',
      createdAt: new Date('2023-05-15T10:30:00'),
      totalPrice: 799.99,
      isPaid: true,
      state: 'done',
      paymentType: 'Credit Card',
      isDelivered: true,
      orderItems: [
        {
          _id: 'item1',
          product: {
            _id: 'prod1',
            title: 'Premium Wireless Earbuds',
            imgCover: 'https://example.com/images/earbuds.jpg',
            rateAvg: 4.8,
            rateCount: 215
          },
          quantity: 1,
          price: 799.99
        }
      ]
    },
    // Order with 2 items (shows fully)
    {
      _id: 'order2',
      orderNumber: 'ORD-1002',
      createdAt: new Date('2023-06-10T14:20:00'),
      totalPrice: 325.50,
      isPaid: true,
      state: 'in progress',
      paymentType: 'PayPal',
      isDelivered: false,
      orderItems: [
        {
          _id: 'item2',
          product: {
            _id: 'prod2',
            title: 'Smartphone Case',
            imgCover: 'https://example.com/images/case.jpg',
            rateAvg: 4.2,
            rateCount: 85
          },
          quantity: 1,
          price: 125.50
        },
        {
          _id: 'item3',
          product: {
            _id: 'prod3',
            title: 'Screen Protector',
            imgCover: 'https://example.com/images/protector.jpg',
            rateAvg: 4.0,
            rateCount: 62
          },
          quantity: 2,
          price: 200.00
        }
      ]
    },
    // Order with 3 items (shows 2 + "Show All" button)
    {
      _id: 'order3',
      orderNumber: 'ORD-1003',
      createdAt: new Date('2023-07-05T09:15:00'),
      totalPrice: 450.25,
      isPaid: false,
      state: 'cancelled',
      paymentType: 'Cash on Delivery',
      isDelivered: false,
      orderItems: [
        {
          _id: 'item4',
          product: {
            _id: 'prod4',
            title: 'USB-C Cable',
            imgCover: 'https://example.com/images/cable.jpg',
            rateAvg: 3.5,
            rateCount: 28
          },
          quantity: 2,
          price: 150.25
        },
        {
          _id: 'item5',
          product: {
            _id: 'prod5',
            title: 'Power Bank',
            imgCover: 'https://example.com/images/powerbank.jpg',
            rateAvg: 4.8,
            rateCount: 195
          },
          quantity: 1,
          price: 300.00
        },
        {
          _id: 'item6',
          product: {
            _id: 'prod6',
            title: 'Phone Stand',
            imgCover: 'https://example.com/images/stand.jpg',
            rateAvg: 4.3,
            rateCount: 42
          },
          quantity: 1,
          price: 89.99
        }
      ]
    }
  ];

  expandedOrders: { [orderId: string]: boolean } = {};

  constructor() {
    this.orders.forEach(order => {
      this.expandedOrders[order._id] = false;
    });
  }

  toggleShowAll(orderId: string): void {
    this.expandedOrders = { 
      ...this.expandedOrders, 
      [orderId]: !this.expandedOrders[orderId] 
    };
  }

  isExpanded(orderId: string): boolean {
    return !!this.expandedOrders[orderId];
  }

  getVisibleOrderItems(order: Orders) {
    if (order.orderItems.length <= 2) {
      return [...order.orderItems];
    }
    return this.isExpanded(order._id) 
      ? [...order.orderItems] 
      : order.orderItems.slice(0, 2);
  }
}

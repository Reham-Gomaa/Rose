

// import { Component, inject } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { OrdersService } from "@rose/shared_services/orders/orders.service";
// import { Orders } from "@rose/core_interfaces/orders";

// @Component({
//   selector: "app-orders",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: "./orders.component.html",
//   styleUrls: ["./orders.component.scss"],
// })
// export class OrdersComponent {
//   orders: Orders[] = [];
//   currentPage = 1;
//   ordersPerPage = 3;
//   expandedOrders: { [orderId: string]: boolean } = {}; // track toggles per order

//   private readonly ordersService = inject(OrdersService);

//   ngOnInit(): void {
//     this.getOrders();
//   }

//   getOrders(): void {
//     this.ordersService.getUserOrders().subscribe({
//       next: (res) => {
//         this.orders = res.orders || [];
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   paginatedOrders(): Orders[] {
//     const startIndex = (this.currentPage - 1) * this.ordersPerPage;
//     return this.orders.slice(startIndex, startIndex + this.ordersPerPage);
//   }

//   toggleShowAllItems(orderId: string): void {
//     this.expandedOrders[orderId] = !this.expandedOrders[orderId];
//   }

//   nextPage(): void {
//     if (this.currentPage * this.ordersPerPage < this.orders.length) {
//       this.currentPage++;
//     }
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
// }

import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Orders } from "@rose/core_interfaces/orders";
import { Product } from "@rose/core_interfaces/carditem.interface";
import { NavbarComponent } from "@rose/features_layouts/navbar/navbar.component";
import { FooterComponent } from "@rose/features_layouts/footer/footer.component";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [CommonModule,NavbarComponent, FooterComponent],
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent {
  orders: Orders[] = [];
  currentPage = 1;
  ordersPerPage = 3;
  expandedOrders: { [orderId: string]: boolean } = {};

  ngOnInit(): void {
    this.loadMockOrders(); 
  }

  loadMockOrders(): void {
    const sampleProduct = (id: string, title: string, img: string): Product => ({
      rateAvg: 5,
      rateCount: 0,
      _id: id,
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      description: "Mock product description",
      imgCover: img,
      images: [],
      price: 100,
      priceAfterDiscount: 90,
      quantity: 10,
      category: "cat1",
      occasion: "occ1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      isSuperAdmin: false,
      sold: 5,
      id
    });

    this.orders = Array.from({ length: 6 }).map((_, i) => ({
      _id: `order${i + 1}`,
      user: "user1",
      orderItems: [
        { product: sampleProduct("p1", "Red Roses", "https://via.placeholder.com/150/FF0000/FFFFFF"), price: 100, quantity: 2, _id: "oi1" },
        { product: sampleProduct("p2", "White Tulips", "https://via.placeholder.com/150/FFFFFF/000000"), price: 150, quantity: 1, _id: "oi2" },
        { product: sampleProduct("p3", "Sunflowers", "https://via.placeholder.com/150/FFFF00/000000"), price: 120, quantity: 3, _id: "oi3" },
        { product: sampleProduct("p4", "Orchids", "https://via.placeholder.com/150/800080/FFFFFF"), price: 180, quantity: 1, _id: "oi4" },
        { product: sampleProduct("p4", "Orchids", "https://via.placeholder.com/150/800080/FFFFFF"), price: 180, quantity: 1, _id: "oi4" }
      ],
      totalPrice: 550,
      paymentType: "cash",
      isPaid: i % 2 === 0,
      isDelivered: false,
      state: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      orderNumber: `#1000${i + 1}`,
      __v: 0
    }));
  }

  paginatedOrders(): Orders[] {
    const startIndex = (this.currentPage - 1) * this.ordersPerPage;
    return this.orders.slice(startIndex, startIndex + this.ordersPerPage);
  }

  toggleShowAllItems(orderId: string): void {
    this.expandedOrders[orderId] = !this.expandedOrders[orderId];
  }

  nextPage(): void {
    if (this.currentPage * this.ordersPerPage < this.orders.length) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}

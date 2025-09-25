import { Component, ViewEncapsulation } from "@angular/core";
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";

@Component({
  selector: "app-table",
  imports: [TableModule, TagModule, RatingModule],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  data = [
    {
      _id: "673c46fd1159920171827c85",
      name: "flowers",
      totalProducts: 15,
      totalRevenue: 9700,
    },
    {
      _id: "673c47441159920171827c8d",
      name: "cards",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "673c479e1159920171827c99",
      name: "chocolate",
      totalProducts: 4,
      totalRevenue: 8500,
    },
    {
      _id: "673c472f1159920171827c8a",
      name: "gifts",
      totalProducts: 1,
      totalRevenue: 1000,
    },
    {
      _id: "673c4a851159920171827ca4",
      name: "Candles & Diffusers",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "673c47751159920171827c93",
      name: "perfumes",
      totalProducts: 1,
      totalRevenue: 340,
    },
    {
      _id: "673c4a551159920171827c9e",
      name: "Cakes",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "673c47591159920171827c90",
      name: "Jewellery",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "673c47881159920171827c96",
      name: "watches",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "673c4a6f1159920171827ca1",
      name: "Plants",
      totalProducts: 1,
      totalRevenue: 440,
    },
    {
      _id: "68a9c198a8bca307f9dfc863",
      name: "gaming2",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "68aa161ba8bca307f9dff600",
      name: "box gifts",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "68c9b396dd8937e0573d42ee",
      name: "Electronics",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "68cec72bdd8937e0573eb6b8",
      name: "electronicssdsssks",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "68cec809dd8937e0573eb6df",
      name: "electronicssdsssk",
      totalProducts: 0,
      totalRevenue: 0,
    },
    {
      _id: "68d0f4ccdd8937e0573eec6e",
      name: "electronicssdssskk",
      totalProducts: 0,
      totalRevenue: 0,
    },
  ];

  // ngOnInit() {
  //     this.productService.getProductsMini().then((data) => {
  //         this.products = data;
  //     });
  // }

  // getSeverity(status: string) {
  //     switch (status) {
  //         case 'INSTOCK':
  //             return 'success';
  //         case 'LOWSTOCK':
  //             return 'warn';
  //         case 'OUTOFSTOCK':
  //             return 'danger';
  //     }
  // }
}

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";
import { ActivatedRoute } from "@angular/router"; 

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, RelatedProductsComponent],
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  //stores the current product ID
  currentProductId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get product ID from route parameters
    this.route.params.subscribe(params => {
      this.currentProductId = params['id'];
      console.log('Current Product ID:', this.currentProductId);
    });

  }
}
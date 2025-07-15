
import { Component, inject, OnInit,OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductReviewComponent } from "./product-review/product-review.component";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductsService } from "../../../shared/services/products/products.service";
import { Product } from "../../../core/interfaces/carditem.interface";
import { ProductDetailsComponent } from "./product-details/product-details.component";

@Component({
  selector: "app-details",
  imports: [CommonModule, ProductReviewComponent, ProductDetailsComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit, OnDestroy {

  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductsService)
  subscription:Subscription = new Subscription();
  productId!:string;
  productDetails:Product = {} as Product;


  getProductId(){
    this._activatedRoute.params.subscribe({
      next:(params)=>{
        this.productId=params['id'];
        this.getProductDetails()
      }
    })
  }


  getProductDetails(){

  this.subscription=this._productService.getProductDetails(this.productId).subscribe({
      next:(response)=>{
        this.productDetails = response.product
        console.log(this.productDetails);
      }
    })

  }

  ngOnInit():void
  {
    this.getProductId();
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }




}

import { Component } from '@angular/core';
import { CategoriesComponent } from "./components/categories/categories.component";
import { GiftsComponent } from "./components/gifts/gifts.component";
import { OurServicesComponent } from "./components/our-services/ourServices.component";
import { BestSellerComponent } from "./components/best-seller/bestSeller.component";
import { PopularItemsComponent } from "./components/popular-items/popularItems.component";
import { AboutUsComponent } from "./components/about-us/aboutUs.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { TestimonialsComponent } from "./components/testimonials/testimonials.component";
import { TrustedByComponent } from "./components/trusted-by/trustedBy.component";

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent, GiftsComponent, OurServicesComponent, BestSellerComponent, PopularItemsComponent, AboutUsComponent, GalleryComponent, TestimonialsComponent, TrustedByComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

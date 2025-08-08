import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslatePipe } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { selectWishlistItems } from "../../../store/wishlist/wishlist-selectors";
import { Product } from "@rose/core_interfaces/carditem.interface";
import { AsyncPipe } from "@angular/common";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";

@Component({
  selector: "app-wishlist",
  imports: [TranslatePipe, AsyncPipe, CardItemComponent],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit {
  private readonly store = inject(Store);

  favouriteItems$!: Observable<Product[]>;

  ngOnInit(): void {
    this.favouriteItems$ = this.store.select(selectWishlistItems);
  }
}

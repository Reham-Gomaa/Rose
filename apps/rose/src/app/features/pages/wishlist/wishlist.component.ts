import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslatePipe } from "@ngx-translate/core";
import { Product } from "@angular-monorepo/products";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { getUserWishlist } from "../../../store/wishlist/wishlist-actions";
import { selectWishlistItems } from "../../../store/wishlist/wishlist-selectors";

@Component({
  selector: "app-wishlist",
  imports: [TranslatePipe, CardItemComponent],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit {
  private readonly store = inject(Store);

  favouriteItems: WritableSignal<Product[]> = signal([]);

  ngOnInit(): void {
    this.setupWishlistSubscription();
    this.loadInitialWishlist();
  }

  private loadInitialWishlist() {
    this.store.dispatch(getUserWishlist());
  }

  setupWishlistSubscription() {
    this.store.select(selectWishlistItems).subscribe((items) => {
      this.favouriteItems.set(items);
    });
  }
}

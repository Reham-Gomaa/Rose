import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslatePipe } from "@ngx-translate/core";
import { Product } from "@rose/core_interfaces/carditem.interface";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { WishlistService } from "@rose/shared_services/wishlist/wishlist.service";
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
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly wishlistService = inject(WishlistService);

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

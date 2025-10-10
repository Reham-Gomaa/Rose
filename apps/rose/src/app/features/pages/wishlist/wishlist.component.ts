import { isPlatformBrowser, NgOptimizedImage } from "@angular/common";
import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
// Pipe
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Interface
import { Product } from "@angular-monorepo/products";
// Shared_Component
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { EmptyCartComponent } from "@rose/shared_Components_ui/emptyCart/emptyCart.component";
import { ConfirmDialogComponent } from "@angular-monorepo/confirm-dialog";
// Store
import { Store } from "@ngrx/store";
import { clearWishlist, getUserWishlist } from "../../../store/wishlist/wishlist-actions";
import { selectWishlistItems } from "../../../store/wishlist/wishlist-selectors";

@Component({
  selector: "app-wishlist",
  imports: [
    TranslatePipe,
    CardItemComponent,
    ButtonComponent,
    ConfirmDialogComponent,
    NgOptimizedImage,
    EmptyCartComponent,
  ],
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

  clearWishlist(confirmed: boolean): void {
    if (!confirmed) return;
    this.store.dispatch(clearWishlist());
    this.favouriteItems.set([]);
  }
}

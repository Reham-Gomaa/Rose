import { isPlatformBrowser, NgOptimizedImage } from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslatePipe } from "@ngx-translate/core";
import { Product } from "@rose/core_interfaces/carditem.interface";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { clearWishlist, loadWishlist } from "../../../store/wishlist/wishlist-actions";
import { selectWishlistItems } from "../../../store/wishlist/wishlist-selectors";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
import { ConfirmDialogComponent } from "@rose/shared_Components_business/confirm-dialog/confirm-dialog.component";
import { EmptyCartComponent } from "@rose/shared_Components_ui/emptyCart/emptyCart.component";

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
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  favouriteItems: WritableSignal<Product[]> = signal([]);

  ngOnInit(): void {
    this.initializeWishlist();
    this.setupWishlistSubscription();
  }

  initializeWishlist() {
    if (!isPlatformBrowser(this.pLATFORM_ID)) return;
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const parsedItems = JSON.parse(stored) as Product[];
      this.favouriteItems.set(parsedItems);
      this.store.dispatch(loadWishlist({ products: parsedItems }));
    }
  }

  setupWishlistSubscription() {
    this.store.select(selectWishlistItems).subscribe((items) => {
      this.favouriteItems.set(items);
      if (isPlatformBrowser(this.pLATFORM_ID)) {
        localStorage.setItem("wishlist", JSON.stringify(items));
      }
    });
  }

  clearWishlist(confirmed: boolean): void {
    if (!confirmed) return;
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      localStorage.removeItem("wishlist");
      this.favouriteItems.set([]);
      this.store.dispatch(clearWishlist());
    }
  }
}

import { isPlatformBrowser } from "@angular/common";
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Product } from "@rose/core_interfaces/cart.interface";
import { Subscription, take } from "rxjs";
import { loadWishlist, toggleWishlistProduct } from "../../store/wishlist/wishlist-actions";
import { selectIsInWishlist, selectWishlistItems } from "../../store/wishlist/wishlist-selectors";

@Directive({
  selector: "[appWishlistToggle]",
})
export class WishlistToggleDirective implements OnInit, OnDestroy {
  @Input() appWishlistToggle!: Product;
  @Input() activeClass = "heart-active";

  isActive = false;
  private wishlistSubscription!: Subscription;
  private isBrowser: boolean;

  constructor(
    private store: Store,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.initializeWishlist();
    this.setupWishlistSubscription();
    this.setAccessibilityAttributes();
  }

  ngOnDestroy() {
    this.wishlistSubscription?.unsubscribe();
  }

  @HostListener("click") onClick() {
    this.toggleProductInWishlist();
  }

  @HostListener("keydown.enter") onEnter() {
    this.toggleProductInWishlist();
  }

  private initializeWishlist() {
    if (!this.isBrowser) return;

    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const favourites = JSON.parse(stored) as Product[];
      this.store.dispatch(loadWishlist({ products: favourites }));

      // Immediately check if current product exists in loaded wishlist
      const exists = favourites.some((item) => item._id === this.appWishlistToggle._id);
      if (exists) {
        this.el.nativeElement.classList.add(this.activeClass);
        this.el.nativeElement.setAttribute("aria-pressed", "true");
      }
    }
  }

  private setupWishlistSubscription() {
    this.wishlistSubscription = this.store
      .select(selectIsInWishlist(this.appWishlistToggle._id))
      .subscribe((isActive) => {
        this.isActive = isActive;
        this.updateClass();
      });
  }

  private setAccessibilityAttributes() {
    if (this.isBrowser) {
      this.el.nativeElement.setAttribute("role", "button");
      this.el.nativeElement.setAttribute("aria-pressed", this.isActive);
    }
  }

  private toggleProductInWishlist() {
    if (!this.isBrowser) return;

    this.store.dispatch(
      toggleWishlistProduct({
        product: this.appWishlistToggle,
      })
    );
    this.persistWishlist();
    this.setupWishlistSubscription();
    this.updateAriaPressed();
  }

  private persistWishlist() {
    this.store
      .select(selectWishlistItems)
      .pipe(take(1))
      .subscribe((items) => {
        localStorage.setItem("wishlist", JSON.stringify(items));
      });
  }

  private updateClass() {
    if (!this.isBrowser) return;

    if (this.isActive) {
      this.el.nativeElement.classList.add(this.activeClass);
    } else {
      this.el.nativeElement.classList.remove(this.activeClass);
    }
  }

  private updateAriaPressed() {
    if (this.isBrowser) {
      this.el.nativeElement.setAttribute("aria-pressed", this.isActive);
    }
  }
}

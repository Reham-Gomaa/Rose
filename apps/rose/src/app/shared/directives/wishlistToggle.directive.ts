import { isPlatformBrowser } from "@angular/common";
import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  Input,
  InputSignal,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { Product } from "@rose/core_interfaces/cart.interface";
import { take } from "rxjs";
import { loadWishlist, toggleWishlistProduct } from "../../store/wishlist/wishlist-actions";
import { selectIsInWishlist, selectWishlistItems } from "../../store/wishlist/wishlist-selectors";

@Directive({
  selector: "[appWishlistToggle]",
})
export class WishlistToggleDirective implements OnInit {
  appWishlistToggle: InputSignal<Product> = input.required<Product>();
  activeClass: InputSignal<string> = input.required<string>();

  private readonly store = inject(Store);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly platformId = inject(PLATFORM_ID);

  isActive: boolean = false;
  renderer: Renderer2 = this.rendererFactory.createRenderer(null, null);

  ngOnInit() {
    this.initializeWishlist();
    this.setupWishlistSubscription();
    this.setAccessibilityAttributes();
  }

  @HostListener("click") onClick() {
    this.toggleProductInWishlist();
  }

  @HostListener("keydown.enter") onEnter() {
    this.toggleProductInWishlist();
  }

  private initializeWishlist() {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem("wishlist");
    if (stored) {
      const favourites = JSON.parse(stored) as Product[];
      this.store.dispatch(loadWishlist({ products: favourites }));

      const exists = favourites.some((item) => item._id === this.appWishlistToggle()._id);
      if (exists) {
        this.renderer.addClass(this.el.nativeElement, this.activeClass());
        this.renderer.setAttribute(this.el.nativeElement, "aria-pressed", "true");
      }
    }
  }

  private setupWishlistSubscription() {
    this.store
      .select(selectIsInWishlist(this.appWishlistToggle()._id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isActive) => {
        this.isActive = isActive;
        this.updateClass();
      });
  }

  private setAccessibilityAttributes() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(this.el.nativeElement, "role", "button");
      this.renderer.setAttribute(this.el.nativeElement, "aria-pressed", String(this.isActive));
    }
  }

  private toggleProductInWishlist() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.store.dispatch(
      toggleWishlistProduct({
        product: this.appWishlistToggle(),
      })
    );
    this.updateStorage();
    this.initializeWishlist();
    this.setupWishlistSubscription();
    this.updateAriaPressed();
  }

  private updateStorage() {
    this.store
      .select(selectWishlistItems)
      .pipe(take(1))
      .subscribe((items) => {
        localStorage.setItem("wishlist", JSON.stringify(items));
      });
  }

  private updateClass() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isActive) {
      this.renderer.addClass(this.el.nativeElement, this.activeClass());
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.activeClass());
    }
  }

  private updateAriaPressed() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(this.el.nativeElement, "aria-pressed", String(this.isActive));
    }
  }
}

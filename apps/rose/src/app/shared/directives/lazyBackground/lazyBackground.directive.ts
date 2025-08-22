import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, inject, Input, PLATFORM_ID } from "@angular/core";

@Directive({
  selector: "[appLazyBackground]",
})
export class LazyBackgroundDirective implements AfterViewInit {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  @Input("appLazyBackground") bgImage!: string;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.pLATFORM_ID)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.el.nativeElement.style.backgroundImage = this.bgImage;
        observer.unobserve(this.el.nativeElement);
      }
    });
    observer.observe(this.el.nativeElement);
  }
}

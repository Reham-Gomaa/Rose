import { Component, OnInit, inject, DestroyRef } from "@angular/core";
// PrimeNg
import { MenuItem } from "primeng/api";
import { Breadcrumb } from "primeng/breadcrumb";
// Router
import { Router, NavigationEnd } from "@angular/router";
// RxJS
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-stepper",
  imports: [Breadcrumb],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent implements OnInit {
  private readonly $distroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  hidden: boolean = false;
  items: MenuItem[] = [];
  home: MenuItem = { icon: "pi pi-home", routerLink: "/dashboard" };
  ngOnInit() {
    this.stepperInit();
  }

  private stepperInit() {
    this.items = this.createBreadcrumbs();
    this._router.events
      .pipe(
        takeUntilDestroyed(this.$distroyRef),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.items = this.createBreadcrumbs();
      });
  }

  private createBreadcrumbs(): MenuItem[] {
    const breadcrumbs: MenuItem[] = [];

    const url = this._router.url;
    for (const segment of url.split("/")) {
      if (segment) {
        breadcrumbs.push({ label: segment });
      }
    }
    return breadcrumbs;
  }

  changeHidden() {
    this.hidden = !this.hidden;
  }

}

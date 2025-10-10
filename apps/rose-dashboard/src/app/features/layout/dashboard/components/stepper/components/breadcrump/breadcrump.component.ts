import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { filter } from "rxjs";

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: "app-breadcrump",
  imports: [],
  templateUrl: "./breadcrump.component.html",
  styleUrl: "./breadcrump.component.scss",
})
export class BreadcrumpComponent implements OnInit {
  private readonly $distroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _translate = inject(TranslateService);

  breadCrumb: Breadcrumb[] = [];

  ngOnInit(): void {
    this.stepperInit();
    this._translate.onDefaultLangChange.pipe(takeUntilDestroyed(this.$distroyRef)).subscribe(() => {
      this.stepperInit();
    });
    this._translate.onLangChange.pipe(takeUntilDestroyed(this.$distroyRef)).subscribe(() => {
      this.stepperInit();
    })
  }

  private stepperInit() {
    this.breadCrumb = this.createBreadcrumbs();
    this._router.events
      .pipe(
        takeUntilDestroyed(this.$distroyRef),
        filter((e) => e instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.breadCrumb = this.createBreadcrumbs();
        console.log(this.breadCrumb);
      });
  }

  private createBreadcrumbs(): Breadcrumb[] {
    const breadcrumbs = [];

    const url = this._router.url;
    let finalUrl = "";
    for (const segment of url.split("/")) {
      const idRegex = /^[0-9a-fA-F]{24}$/;
      if (segment && !idRegex.test(segment)) {
        const key = `breadcrumb.${segment}`;
        const translated = this._translate.instant(key);
        const label: string = translated;
        finalUrl += segment + "/";
        breadcrumbs.push({ label, url: finalUrl });
      }
    }
    return breadcrumbs;
  }

  openUrl(url: string) {
    this._router.navigate([url]);
  }
}

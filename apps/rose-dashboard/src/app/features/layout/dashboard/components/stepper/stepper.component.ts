import { Component, OnInit, inject, DestroyRef } from "@angular/core";
// PrimeNg
import { MenuItem } from "primeng/api";
import { Breadcrumb } from "primeng/breadcrumb";
// Transelate
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
// Router
import { Router, NavigationEnd } from "@angular/router";
// RxJS
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BreadcrumpComponent } from "./components/breadcrump/breadcrump.component";

@Component({
  selector: "app-stepper",
  imports: [TranslatePipe, BreadcrumpComponent],
  templateUrl: "./stepper.component.html",
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {

  hidden: boolean = false;





  

  changeHidden() {
    this.hidden = !this.hidden;
  }

}

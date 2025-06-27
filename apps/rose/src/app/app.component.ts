import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DarkModeService } from "./core/services/darkmode/darkmode.service";
import { Store } from "@ngrx/store";
import * as sortSelectors from "./store/sort/store.selectors";
import * as sortActions from "./store/sort/sort.actions";
import { sortType } from "./store/sort/sort.states";

@Component({
  imports: [RouterOutlet],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  protected darkMode = inject(DarkModeService);
  title = "rose";
}

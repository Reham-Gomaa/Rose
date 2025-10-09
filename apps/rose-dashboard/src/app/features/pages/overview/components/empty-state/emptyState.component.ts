import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-empty-state",
  imports: [TranslatePipe],
  templateUrl: "./emptyState.component.html",
  styleUrl: "./emptyState.component.scss",
})
export class EmptyStateComponent {}

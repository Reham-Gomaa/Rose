import { Component, Input } from "@angular/core";
import { ProgressSpinnerModule } from "primeng/progressspinner";
@Component({
  selector: "app-loading",
  imports: [ProgressSpinnerModule],
  templateUrl: "./loading.component.html",
  styleUrl: "./loading.component.scss",
})
export class LoadingComponent {
  @Input() message = "Please wait... checking authorization";
}

import { Component, Input } from "@angular/core";

@Component({
  selector: "app-separator",
  imports: [],
  templateUrl: "./separator.component.html",
  styleUrl: "./separator.component.scss",
})
export class SeparatorComponent {
  @Input() position: "up" | "down" = "up";
}

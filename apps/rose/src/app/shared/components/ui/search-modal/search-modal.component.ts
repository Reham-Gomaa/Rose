import { Component } from "@angular/core";
//primeNg
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-search-modal",
  imports: [ButtonModule],
  templateUrl: "./search-modal.component.html",
  styleUrl: "./search-modal.component.scss",
})
export class SearchModalComponent {
  closeSearch = false;
  closeModal() {
    this.closeSearch = true;
  }
}

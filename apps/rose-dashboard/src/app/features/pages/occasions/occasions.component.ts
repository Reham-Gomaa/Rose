import { Component, inject, signal, WritableSignal } from "@angular/core";
import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
//lib
import {OccasionService,occasion} from "@angular-monorepo/occasions"
@Component({
  selector: "app-occasions",
  imports: [DataViewComponent],
  templateUrl: "./occasions.component.html",
  styleUrl: "./occasions.component.scss",
})
export class OccasionsComponent {

  private occasion_service = inject(OccasionService)
  table_header_records : string[] = ["name" , "products"]
  occasions:WritableSignal<occasion[]> = signal<occasion[]>([]);

  ngOnInit() {
    this.occasion_service.getAllOccasions().subscribe({
      next:(res)=>{
        this.occasions.set(res.occasions);
      }
    })
  }
  




}

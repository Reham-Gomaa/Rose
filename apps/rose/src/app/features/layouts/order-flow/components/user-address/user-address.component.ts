import { Component, EventEmitter, inject, input,OnInit,Output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import { UserAddressService } from "@rose/shared_services/user-address/user-address.service";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { AddressItemComponent } from "./components/address-item/address-item.component";
import { HeadAddressComponent } from "./components/head-address/head-address.component";
import { Store } from "@ngrx/store";
import { selectAddressCount, selectAddressError, selectAddressLoading, selectAllAddresses, selectHasAddresses } from "apps/rose/src/app/store/address/address.selector";
import { showAddresses } from "apps/rose/src/app/store/address/address.actions";
import { AsyncPipe, JsonPipe, NgIf, NgFor } from '@angular/common';


@Component({
  selector: "app-user-address",
  imports: [ButtonModule, InputTextModule, AvatarModule, CustomMainDialogComponent, AddressItemComponent, HeadAddressComponent],
  templateUrl: "./user-address.component.html",
  styleUrl: "./user-address.component.scss",
})
export class UserAddressComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  private store = inject(Store);
  visible = input.required<boolean>();
  address!:Array<Address>;
  loading!:boolean;
  error!:any;

  
  addresses$ = this.store.select(selectAllAddresses);
  loading$ = this.store.select(selectAddressLoading);
  error$ = this.store.select(selectAddressError);


  ngOnInit(): void {
    this.loadAddresses()
    this.addresses$.subscribe(addresses => {
      this.address=addresses
    });
    this.loading$.subscribe(loading=>{
      this.loading=loading;
    })
    this.error$.subscribe(error=>{
      this.error=error;
    })
    
  }

  close() {
    this.closed.emit();
  }
   
  
  loadAddresses() {
    this.store.dispatch(showAddresses());
  }
}

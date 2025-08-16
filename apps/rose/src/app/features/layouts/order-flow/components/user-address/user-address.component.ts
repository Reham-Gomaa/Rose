import { Component, DestroyRef, EventEmitter, inject, input,OnInit,Output, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { AvatarModule } from "primeng/avatar";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { AddressItemComponent } from "./components/address-item/address-item.component";
import { HeadAddressComponent } from "./components/head-address/head-address.component";
import { Store } from "@ngrx/store";
import { selectAddressError, selectAddressLoading, selectAddressState, selectAllAddresses } from "apps/rose/src/app/store/address/address.selector";
import { setAddressState, showAddresses } from "apps/rose/src/app/store/address/address.actions";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { AddressSituations } from "apps/rose/src/app/store/address/addresses.state";
import { SpinnerComponent } from "@rose/shared_Components_ui/spinner/spinner.component";
import { TranslatePipe } from "@ngx-translate/core";
import { AddressStepperComponent } from "./components/address-stepper/address-stepper.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


@Component({
  selector: "app-user-address",
  imports: [ButtonModule, InputTextModule, AvatarModule, CustomMainDialogComponent, AddressItemComponent, TranslatePipe, HeadAddressComponent, DeleteDialogComponent, SpinnerComponent, AddressStepperComponent],
  templateUrl: "./user-address.component.html",
  styleUrl: "./user-address.component.scss",
})
export class UserAddressComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  @Output() closed = new EventEmitter<void>();
  visible = input.required<boolean>();


  address!:Array<Address>;
  loading!:boolean;
  error!:any;
  addressState!:AddressSituations;
  myAddress!: Address;

  


  
  addresses$ = this._store.select(selectAllAddresses);
  loading$ = this._store.select(selectAddressLoading);
  error$ = this._store.select(selectAddressError);
  addressState$=this._store.select(selectAddressState);

  ngOnInit(): void {
    this.loadAddresses()
    this.initSelectors()
   
    
  }

  close() {
    this.closed.emit();
  }


  closeDeleteDialog(){
    this._store.dispatch(setAddressState({addressState:1}))
  }

  closeStepperDialog(){
    this._store.dispatch(setAddressState({addressState:1}))
  }
   
  
  loadAddresses() {
    this._store.dispatch(showAddresses());
  }

  initSelectors(){
     this.addresses$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(addresses => {
      this.address=addresses
    });
    this.loading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(loading=>{
      this.loading=loading;
    })
    this.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(error=>{
      this.error=error;
    })
    this.addressState$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      addressState=>{
        this.addressState=addressState
      }
    )
  }
}

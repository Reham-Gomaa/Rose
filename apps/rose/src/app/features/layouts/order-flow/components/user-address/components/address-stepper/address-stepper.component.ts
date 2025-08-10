import { Component, EventEmitter, inject, input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";
import { Store } from "@ngrx/store";
import { AddAddress, setAddressState, showAddresses, updateAddress } from "apps/rose/src/app/store/address/address.actions";
import { Address } from "@rose/core_interfaces/user-address.interface";
import { selectAddress, selectAddressId } from "apps/rose/src/app/store/address/address.selector";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-address-stepper",
  imports: [
    GoogleMapsModule,
    ButtonModule,
    StepperModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomInputPhoneComponent,
    CustomMainDialogComponent,
    TranslatePipe
  ],
  templateUrl: "./address-stepper.component.html",
  styleUrl: "./address-stepper.component.scss",
})
export class AddressStepperComponent implements OnInit {
  private readonly _store = inject(Store);
  isUpdate = input<boolean>();
  address!: Address;
  visible = input.required<boolean>();

  @Output() closed = new EventEmitter<void>();
  center = { lat: 30.0444, lng: 31.2357 };
  addressId!: string;
  addressId$ = this._store.select(selectAddressId);

  addressForm: FormGroup = new FormGroup({
    city: new FormControl("", [Validators.required]),
    street: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(\+201|01)[0125][0-9]{8}$/),
    ]),
  });

  // onMapClick(event: google.maps.MapMouseEvent) {
  //   if (event.latLng) {
  //     this.selected = {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     };
  //   }
  // }

  ngOnInit(): void {
    this.init();
  }

  close() {
    this.closed.emit();
  }

  submitForm(fn: Function) {
    this.addressForm.markAllAsTouched();
    if (!this.addressForm.invalid) {
      fn();
    }
  }

  onNextClick(callback: Function) {
    this.submitForm(() => callback(2));
  }

  onDone() {
    if (this.isUpdate()) {
      this.updateAddress();
    } else {
      this.addAddress();
    }
    this._store.dispatch(setAddressState({addressState:0}))
  }

  addAddress() {
    const address: Address = {
      ...this.addressForm.value,
      lat: this.center.lat.toString(),
      long: this.center.lng.toString(),
      username: "maher",
    };
    this._store.dispatch(AddAddress({ address }));
  }

  updateAddress() {
    const address: Address = {
      ...this.addressForm.value,
      lat: this.address?.lat,
      long: this.address?.long,
      username: "maher",
    };
    this._store.dispatch(updateAddress({ address: address, addressId: this.addressId }));
  }

  init() {
    this.addressId$.subscribe((addressId) => {
      this.addressId = addressId;
      this._store.select(selectAddress).subscribe((address) => {
        this.address = address;
        console.log(address);
        if (this.isUpdate()) {
          this.addressForm.patchValue({
            street: this.address?.street,
            city: this.address?.city,
            phone: this.address?.phone,
          });
        }
      });
    });
  }
}

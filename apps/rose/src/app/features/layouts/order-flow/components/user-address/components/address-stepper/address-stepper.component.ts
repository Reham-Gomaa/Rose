import { Component, DestroyRef, EventEmitter, inject, input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";
import { ButtonModule } from "primeng/button";
import { StepperModule } from "primeng/stepper";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { CustomInputPhoneComponent } from "@rose/shared_Components_ui/custom-input-phone/custom-input-phone.component";
import { Store } from "@ngrx/store";
import {
  AddAddress,
  setAddressState,
  updateAddress,
} from "apps/rose/src/app/store/address/address.actions";
import { Address } from "@rose/core_interfaces/user-address.interface";
import {
  selectAddress,
  selectAddressId,
  selectUserName,
} from "apps/rose/src/app/store/address/address.selector";
import { CustomMainDialogComponent } from "@rose/shared_Components_ui/custom-main-dialog/custom-main-dialog.component";
import { TranslatePipe } from "@ngx-translate/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    TranslatePipe,
  ],
  templateUrl: "./address-stepper.component.html",
  styleUrl: "./address-stepper.component.scss",
})
export class AddressStepperComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  @Output() closed = new EventEmitter<void>();
  isUpdate = input<boolean>();
  visible = input.required<boolean>();

  address!: Address;
  // center = { lat: 30.0444, lng: 31.2357 };
  addressId!: string;
  userName!: string;

  addressId$ = this._store.select(selectAddressId);
  address$ = this._store.select(selectAddress);
  userName$ = this._store.select(selectUserName);

  center: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 }; // Example: Cairo
  markerPosition!: google.maps.LatLngLiteral;

  addressForm: FormGroup = new FormGroup({
    city: new FormControl("", [Validators.required]),
    street: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(/^(\+201|01)[0125][0-9]{8}$/),
    ]),
  });

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
    this._store.dispatch(setAddressState({ addressState: 0 }));
  }

  addAddress() {
    const address: Address = {
      ...this.addressForm.value,
      lat: this.center.lat.toString(),
      long: this.center.lng.toString(),
      username: this.userName,
    };
    this._store.dispatch(AddAddress({ address }));
  }

  updateAddress() {
    const address: Address = {
      ...this.addressForm.value,
      lat: this.address?.lat,
      long: this.address?.long,
      username: this.userName,
    };
    this._store.dispatch(updateAddress({ address: address, addressId: this.addressId }));
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    }
  }

  init() {
    this.addressId$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((addressId) => {
      this.addressId = addressId;
      this.address$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((address) => {
        this.address = address;
        if (this.isUpdate()) {
          this.addressForm.patchValue({
            street: this.address?.street,
            city: this.address?.city,
            phone: this.address?.phone,
          });
        }
      });
    });

    this.userName$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((userName) => {
      this.userName = userName;
    });
  }
}

import { Component, forwardRef, input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-custom-input-phone",
  templateUrl: "./custom-input-phone.component.html",
  styleUrl: "./custom-input-phone.component.scss",
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputPhoneComponent),
      multi: true,
    },
  ],
})
export class CustomInputPhoneComponent implements ControlValueAccessor {
  id = input<string>();
  placeholder = input<string>("");
  labelText = input<string>("");
  countries = [
    { name: "EG", code: "+20", flag: "https://flagcdn.com/16x12/eg.png" },
    { name: "US", code: "+1", flag: "https://flagcdn.com/16x12/us.png" },
    { name: "UA", code: "+380", flag: "https://flagcdn.com/16x12/ua.png" },
  ];
  phoneNumber = "";
  selectedCountry = this.countries[0];
  dropdownOpen = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this.phoneNumber = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onCountryChange(event: Event) {
    this.propagateValue();
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.phoneNumber = input.value;
    this.propagateValue();
  }

  propagateValue() {
    this.onChange(`${this.selectedCountry.code}${this.phoneNumber}`);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
  }
}

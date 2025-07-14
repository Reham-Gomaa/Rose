import { Component, forwardRef, input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputErrorHandlingComponent } from "@rose/shared_Components_business/input-error-handling/input-error-handling.component";

@Component({
  selector: "app-custom-input-phone",
  templateUrl: "./custom-input-phone.component.html",
  styleUrl: "./custom-input-phone.component.scss",
  standalone: true,
  imports: [InputErrorHandlingComponent],
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
  errorHandilgControl = input<AbstractControl>();
  countries = [
    { name: "EG", code: "+20", flag: "https://flagcdn.com/16x12/eg.png" },
    { name: "US", code: "+1", flag: "https://flagcdn.com/16x12/us.png" },
    { name: "UA", code: "+380", flag: "https://flagcdn.com/16x12/ua.png" },
    { name: "CA", code: "+1", flag: "https://flagcdn.com/16x12/ca.png" },
    { name: "GB", code: "+44", flag: "https://flagcdn.com/16x12/gb.png" },
    { name: "DE", code: "+49", flag: "https://flagcdn.com/16x12/de.png" },
    { name: "FR", code: "+33", flag: "https://flagcdn.com/16x12/fr.png" },
    { name: "IT", code: "+39", flag: "https://flagcdn.com/16x12/it.png" },
    { name: "ES", code: "+34", flag: "https://flagcdn.com/16x12/es.png" },
    { name: "RU", code: "+7", flag: "https://flagcdn.com/16x12/ru.png" },
    { name: "CN", code: "+86", flag: "https://flagcdn.com/16x12/cn.png" },
    { name: "IN", code: "+91", flag: "https://flagcdn.com/16x12/in.png" },
    { name: "BR", code: "+55", flag: "https://flagcdn.com/16x12/br.png" },
    { name: "SA", code: "+966", flag: "https://flagcdn.com/16x12/sa.png" },
    { name: "TR", code: "+90", flag: "https://flagcdn.com/16x12/tr.png" },
    { name: "JP", code: "+81", flag: "https://flagcdn.com/16x12/jp.png" },
    { name: "KR", code: "+82", flag: "https://flagcdn.com/16x12/kr.png" },
    { name: "AU", code: "+61", flag: "https://flagcdn.com/16x12/au.png" },
    { name: "AR", code: "+54", flag: "https://flagcdn.com/16x12/ar.png" },
    { name: "MX", code: "+52", flag: "https://flagcdn.com/16x12/mx.png" },
    { name: "ZA", code: "+27", flag: "https://flagcdn.com/16x12/za.png" },
    { name: "NG", code: "+234", flag: "https://flagcdn.com/16x12/ng.png" },
    { name: "KE", code: "+254", flag: "https://flagcdn.com/16x12/ke.png" },
    { name: "SD", code: "+249", flag: "https://flagcdn.com/16x12/sd.png" },
    { name: "DZ", code: "+213", flag: "https://flagcdn.com/16x12/dz.png" },
    { name: "MA", code: "+212", flag: "https://flagcdn.com/16x12/ma.png" },
    { name: "IQ", code: "+964", flag: "https://flagcdn.com/16x12/iq.png" },
    { name: "IR", code: "+98", flag: "https://flagcdn.com/16x12/ir.png" },
    { name: "PK", code: "+92", flag: "https://flagcdn.com/16x12/pk.png" },
    { name: "ID", code: "+62", flag: "https://flagcdn.com/16x12/id.png" },
    { name: "TH", code: "+66", flag: "https://flagcdn.com/16x12/th.png" },
    { name: "VN", code: "+84", flag: "https://flagcdn.com/16x12/vn.png" },
    { name: "PH", code: "+63", flag: "https://flagcdn.com/16x12/ph.png" },
    { name: "MY", code: "+60", flag: "https://flagcdn.com/16x12/my.png" },
    { name: "SG", code: "+65", flag: "https://flagcdn.com/16x12/sg.png" },
    { name: "NZ", code: "+64", flag: "https://flagcdn.com/16x12/nz.png" },
    { name: "SE", code: "+46", flag: "https://flagcdn.com/16x12/se.png" },
    { name: "NO", code: "+47", flag: "https://flagcdn.com/16x12/no.png" },
    { name: "FI", code: "+358", flag: "https://flagcdn.com/16x12/fi.png" },
    { name: "DK", code: "+45", flag: "https://flagcdn.com/16x12/dk.png" },
    { name: "PL", code: "+48", flag: "https://flagcdn.com/16x12/pl.png" },
    { name: "NL", code: "+31", flag: "https://flagcdn.com/16x12/nl.png" },
    { name: "BE", code: "+32", flag: "https://flagcdn.com/16x12/be.png" },
    { name: "CH", code: "+41", flag: "https://flagcdn.com/16x12/ch.png" },
    { name: "AT", code: "+43", flag: "https://flagcdn.com/16x12/at.png" },
    { name: "GR", code: "+30", flag: "https://flagcdn.com/16x12/gr.png" },
    { name: "PT", code: "+351", flag: "https://flagcdn.com/16x12/pt.png" },
    { name: "IE", code: "+353", flag: "https://flagcdn.com/16x12/ie.png" },
    { name: "HU", code: "+36", flag: "https://flagcdn.com/16x12/hu.png" },
    { name: "CZ", code: "+420", flag: "https://flagcdn.com/16x12/cz.png" },
    { name: "RO", code: "+40", flag: "https://flagcdn.com/16x12/ro.png" },
    { name: "SK", code: "+421", flag: "https://flagcdn.com/16x12/sk.png" },
    { name: "BG", code: "+359", flag: "https://flagcdn.com/16x12/bg.png" },
    { name: "HR", code: "+385", flag: "https://flagcdn.com/16x12/hr.png" },
    { name: "RS", code: "+381", flag: "https://flagcdn.com/16x12/rs.png" },
    { name: "UA", code: "+380", flag: "https://flagcdn.com/16x12/ua.png" }
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
    this.phoneNumber = input.value.replace(/[^0-9]/g, "");
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

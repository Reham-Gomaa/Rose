import { InputErrorHandlingComponent } from "@angular-monorepo/rose-custom-inputs";
import { NgOptimizedImage } from "@angular/common";
import { Component, forwardRef, input, OnInit, OnDestroy } from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Country } from "@rose/core_interfaces/country";

@Component({
  selector: "lib-custom-input-phone",
  templateUrl: "./custom-input-phone.component.html",
  styleUrl: "./custom-input-phone.component.scss",
  imports: [InputErrorHandlingComponent, NgOptimizedImage],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputPhoneComponent),
      multi: true,
    },
  ],
})
export class CustomInputPhoneComponent implements ControlValueAccessor, OnDestroy {
  id = input<string>();
  placeholder = input<string>("");
  labelText = input<string>("");
  errorHandilgControl = input<AbstractControl>();
  baseFlagUrl = "https://flagcdn.com/16x12/";
  countries: Country[] = [
    { name: "EG", code: "+20", flag: "eg.png" },
    { name: "US", code: "+1", flag: "us.png" },
    { name: "UA", code: "+380", flag: "ua.png" },
    { name: "CA", code: "+1", flag: "ca.png" },
    { name: "GB", code: "+44", flag: "gb.png" },
    { name: "DE", code: "+49", flag: "de.png" },
    { name: "FR", code: "+33", flag: "fr.png" },
    { name: "IT", code: "+39", flag: "it.png" },
    { name: "ES", code: "+34", flag: "es.png" },
    { name: "RU", code: "+7", flag: "ru.png" },
    { name: "CN", code: "+86", flag: "cn.png" },
    { name: "IN", code: "+91", flag: "in.png" },
    { name: "BR", code: "+55", flag: "br.png" },
    { name: "SA", code: "+966", flag: "sa.png" },
    { name: "TR", code: "+90", flag: "tr.png" },
    { name: "JP", code: "+81", flag: "jp.png" },
    { name: "KR", code: "+82", flag: "kr.png" },
    { name: "AU", code: "+61", flag: "au.png" },
    { name: "AR", code: "+54", flag: "ar.png" },
    { name: "MX", code: "+52", flag: "mx.png" },
    { name: "ZA", code: "+27", flag: "za.png" },
    { name: "NG", code: "+234", flag: "ng.png" },
    { name: "KE", code: "+254", flag: "ke.png" },
    { name: "SD", code: "+249", flag: "sd.png" },
    { name: "DZ", code: "+213", flag: "dz.png" },
    { name: "MA", code: "+212", flag: "ma.png" },
    { name: "IQ", code: "+964", flag: "iq.png" },
    { name: "IR", code: "+98", flag: "ir.png" },
    { name: "PK", code: "+92", flag: "pk.png" },
    { name: "ID", code: "+62", flag: "id.png" },
    { name: "TH", code: "+66", flag: "th.png" },
    { name: "VN", code: "+84", flag: "vn.png" },
    { name: "PH", code: "+63", flag: "ph.png" },
    { name: "MY", code: "+60", flag: "my.png" },
    { name: "SG", code: "+65", flag: "sg.png" },
    { name: "NZ", code: "+64", flag: "nz.png" },
    { name: "SE", code: "+46", flag: "se.png" },
    { name: "NO", code: "+47", flag: "no.png" },
    { name: "FI", code: "+358", flag: "fi.png" },
    { name: "DK", code: "+45", flag: "dk.png" },
    { name: "PL", code: "+48", flag: "pl.png" },
    { name: "NL", code: "+31", flag: "nl.png" },
    { name: "BE", code: "+32", flag: "be.png" },
    { name: "CH", code: "+41", flag: "ch.png" },
    { name: "AT", code: "+43", flag: "at.png" },
    { name: "GR", code: "+30", flag: "gr.png" },
    { name: "PT", code: "+351", flag: "pt.png" },
    { name: "IE", code: "+353", flag: "ie.png" },
    { name: "HU", code: "+36", flag: "hu.png" },
    { name: "CZ", code: "+420", flag: "cz.png" },
    { name: "RO", code: "+40", flag: "ro.png" },
    { name: "SK", code: "+421", flag: "sk.png" },
    { name: "BG", code: "+359", flag: "bg.png" },
    { name: "HR", code: "+385", flag: "hr.png" },
    { name: "RS", code: "+381", flag: "rs.png" },
    { name: "UA", code: "+380", flag: "ua.png" },
  ];
  phoneNumber = "";
  selectedCountry: Country = this.countries[0];
  dropdownOpen = false;

  private handleDocumentClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(".custom-country-dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  };

  constructor() {
    document.addEventListener("click", this.handleDocumentClick);
  }

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
    this.propagateValue();
  }

  propagateValue() {
    this.onChange(`${this.selectedCountry.code}${this.phoneNumber}`);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.dropdownOpen = false;
  }

  ngOnDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  }
}

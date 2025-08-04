import { Component, input } from '@angular/core';
import { Address } from '@rose/core_interfaces/user-address.interface';

@Component({
  selector: 'app-address-item',
  imports: [],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.scss'
})
export class AddressItemComponent {
 address=input.required<Address>();
}

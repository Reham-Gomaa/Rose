import { Component } from '@angular/core';
import { ServicesInterface } from '../../../../interfaces/our-services/services.interface';

@Component({
  selector: 'app-our-services',
  imports: [],
  templateUrl: './ourServices.component.html',
  styleUrl: './ourServices.component.scss',
})
export class OurServicesComponent {
  services:ServicesInterface[] = [
    {id:1 , icon:"pi pi-truck" , heading:"Free Delivery" , p:"Orders Over $120"},
    {id:2 , icon:"pi pi-sync" , heading:"Get Refund" , p:"Within 30 Days Returns"},
    {id:3 , icon:"pi pi-wallet" , heading:"Safe Payment" , p:"100% Secure Payment"},
    {id:4 , icon:"pi pi-phone" , heading:"24/7 Support" , p:"Feel Free To Call Us"},
  ]
}

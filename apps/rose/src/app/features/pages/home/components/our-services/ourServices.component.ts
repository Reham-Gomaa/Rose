import { Component } from '@angular/core';
import { ServicesInterface } from '../../../../../core/interfaces/our-services/services.interface';

@Component({
  selector: 'app-our-services',
  imports: [],
  templateUrl: './ourServices.component.html',
  styleUrl: './ourServices.component.scss',
})
export class OurServicesComponent {
  services:ServicesInterface[] = [
    {id:1 , icon:"pi pi-truck" , heading:"Free Delivery" , paragraph:"Orders Over $120"},
    {id:2 , icon:"paragraphi paragraphi-sync" , heading:"Get Refund" , paragraph:"Within 30 Days Returns"},
    {id:3 , icon:"pi pi-wallet" , heading:"Safe Payment" , paragraph:"100% Secure Payment"},
    {id:4 , icon:"pi pi-phone" , heading:"24/7 Support" , paragraph:"Feel Free To Call Us"},
  ]
}

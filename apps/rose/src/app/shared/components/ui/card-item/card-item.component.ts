import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../core/interfaces/carditem.interface';

//PrimeNg

import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-card-item',
  imports: [ReactiveFormsModule, RatingModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {
  @Input() productInfo!: Product;

  formGroup = new FormGroup({
    value: new FormControl<number>(4)
  });

  ngOnInit() {
    this.formGroup.controls.value.setValue(this.productInfo.rateAvg);
  }
}

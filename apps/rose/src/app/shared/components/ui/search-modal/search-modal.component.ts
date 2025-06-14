import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-modal',
  imports: [CommonModule,ButtonModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit {
  closeSearch = false;
  ngOnInit(){
    console.log(this.closeSearch);
  }
  closeModal(){
    this.closeSearch = true;
  }
}

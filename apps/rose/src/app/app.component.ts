import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/services/darkmode/darkmode.service';
import { Store } from '@ngrx/store';
import * as sortSelectors from './store/sort/store.selectors';
import * as sortActions from './store/sort/sort.actions';
import { sortType } from './store/sort/sort.states';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected darkMode = inject(DarkModeService);
  private _store = inject(Store)
  title = 'rose';


  ngOnInit(){

    this._store.dispatch(sortActions.loadProducts())
    this._store.select(sortSelectors.sortedProducts).subscribe({
      next: (sortedProducts) => console.log(sortedProducts)
    })
  }

  getSortedProducts(){
    this._store.select(sortSelectors.sortedProducts).subscribe({
      next: (sortedProducts) => console.log(sortedProducts)
    })
  }

  sortByPrice(type:sortType) {
    this._store.dispatch(sortActions.sortByPrice({
      sType: type
    }))
  }

  sortByTitle() {
    this._store.dispatch(sortActions.sortByTitle({
      sType: 'desc'
    }))
  }


}

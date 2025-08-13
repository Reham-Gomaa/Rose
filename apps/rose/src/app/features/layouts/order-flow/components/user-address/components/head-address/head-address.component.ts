import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { setAddress, setAddressState } from 'apps/rose/src/app/store/address/address.actions';

@Component({
  selector: 'app-head-address',
  imports: [TranslateModule],
  templateUrl: './head-address.component.html',
  styleUrl: './head-address.component.scss'
})
export class HeadAddressComponent {
    private readonly _store = inject(Store);

  openAddDialog(){
    this._store.dispatch(setAddressState({ addressState: 2 }));
  }
}

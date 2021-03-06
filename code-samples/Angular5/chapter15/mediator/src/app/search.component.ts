import {Component} from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import { Store } from '@ngrx/store';
import { SearchAction} from './actions';

@Component({
  selector: 'app-search',
  template: `
      <h2>Search component</h2>
      <input type="text" placeholder="Enter product" [formControl]="searchInput">
    `,
  styles: ['.main {background: yellow}']
})
export class SearchComponent {

  searchInput: FormControl;

  constructor(private store: Store<any>) {
    this.searchInput = new FormControl('');

    this.searchInput.valueChanges
      .debounceTime(300)
      .do(value => console.log(`The user entered ${value}`))
      .subscribe(searchValue => {
        this.store.dispatch(new SearchAction({ searchQuery: searchValue }));
      });
  }
}

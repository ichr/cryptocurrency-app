import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FiatCurrency } from './shared/fiat-currency.enum';
import { SettingsState } from '../shared/settings.state';
import { Observable } from 'rxjs';
import { SetActiveFiatCurrency } from '../shared/settings.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  fiatCurrencyEnum = FiatCurrency;

  activeFiatCurrency: FiatCurrency;

  @Select(SettingsState.activeFiatCurrency) activeFiatCurrency$: Observable<FiatCurrency>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.activeFiatCurrency$.subscribe(currency => {
      this.activeFiatCurrency = currency;
    });
  }

  onSelectorChange() {
    this.store.dispatch(new SetActiveFiatCurrency(this.activeFiatCurrency));
  }

}

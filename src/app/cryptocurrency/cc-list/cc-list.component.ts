import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingsState } from 'app/settings/shared/settings.state';
import { FetchCryptocurrencyList } from '../shared/cryptocurrency.actions';
import { FiatCurrency } from 'app/settings/settings/shared/fiat-currency.enum';
import { CryptocurrencyState } from '../shared/cryptocurrency.state';
import { Observable } from 'rxjs';
import { CryptocurrencyObject } from '../shared/models/cryptocurrency-object.model';

@Component({
  selector: 'app-cc-list',
  templateUrl: './cc-list.component.html',
  styleUrls: ['./cc-list.component.scss']
})
export class CcListComponent implements OnInit {

  static readonly PAGE_SIZE = 10;

  @Select(CryptocurrencyState.cryptocurrencies) cryptocurrencies$: Observable<CryptocurrencyObject[]>;

  currentFiat: FiatCurrency;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentFiat = this.store.selectSnapshot(SettingsState.activeFiatCurrency);

    this.loadList();
  }

  private loadList() {
    this.store.dispatch(new FetchCryptocurrencyList(1, CcListComponent.PAGE_SIZE, this.currentFiat));
  }

}

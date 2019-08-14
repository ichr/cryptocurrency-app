import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SettingsState } from 'app/settings/shared/settings.state';
import { FetchCryptocurrencyList } from '../shared/cryptocurrency.actions';
import { FiatCurrency } from 'app/settings/settings/shared/fiat-currency.enum';
import { CryptocurrencyState } from '../shared/cryptocurrency.state';
import { Observable } from 'rxjs';
import { CryptocurrencyObject } from '../shared/models/cryptocurrency-object.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cc-list',
  templateUrl: './cc-list.component.html',
  styleUrls: ['./cc-list.component.scss']
})
export class CcListComponent implements OnInit {

  static readonly PAGE_SIZE = 100;

  cryptocurrencies$: Observable<CryptocurrencyObject[]>;

  currentFiat: FiatCurrency;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentFiat = this.store.selectSnapshot(SettingsState.activeFiatCurrency);

    this.initializeCryptocurrencyDetailsSelector();

    this.loadList(false);
  }

  onRefreshBtnClicked(): void {
    this.loadList(true);
  }

  private loadList(force: boolean) {
    this.store.dispatch(new FetchCryptocurrencyList(1, CcListComponent.PAGE_SIZE, this.currentFiat, force));
  }

  private initializeCryptocurrencyDetailsSelector() {
    this.cryptocurrencies$ = this.store
      .select(CryptocurrencyState.cryptocurrencyList)
      .pipe(map(filterFn => filterFn(this.currentFiat)));
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngxs/store';
import { CryptocurrencyState } from 'app/cryptocurrency/shared/cryptocurrency.state';
import { FetchCryptocurrencyDetail } from 'app/cryptocurrency/shared/cryptocurrency.actions';
import { Observable } from 'rxjs';
import { CryptocurrencyObject } from 'app/cryptocurrency/shared/models/cryptocurrency-object.model';
import { FiatCurrency } from 'app/settings/settings/shared/fiat-currency.enum';
import { SettingsState } from 'app/settings/shared/settings.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cc-detail',
  templateUrl: './cc-detail.component.html',
  styleUrls: ['./cc-detail.component.scss']
})
export class CcDetailComponent implements OnInit {

  readonly BTC = 'BTC';

  selectedSymbol: string;
  currentFiat: FiatCurrency;

  cryptocurrencyDetailsCurrentFiat$: Observable<CryptocurrencyObject>;
  cryptocurrencyDetailsBtc$: Observable<CryptocurrencyObject>;

  constructor(private store: Store,
              private route: ActivatedRoute) {

    this.currentFiat = this.store.selectSnapshot(SettingsState.activeFiatCurrency);

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.selectedSymbol = params.get('symbol');
        this.initializeCryptocurrencyDetailsSelectors();
        this.loadDetail(false);
      });
  }

  ngOnInit() {}

  onRefreshBtnClicked(): void {
    this.loadDetail(true);
  }

  private loadDetail(force: boolean): void {
    this.store
      .dispatch(new FetchCryptocurrencyDetail(this.selectedSymbol, this.currentFiat, force))
      .subscribe(() => {
        // NOTE: double fetch is needed because of: `plan is limited to 1 convert options` ERROR
        this.store.dispatch(new FetchCryptocurrencyDetail(this.selectedSymbol, this.BTC, force));
      })
  }

  private initializeCryptocurrencyDetailsSelectors() {
    this.cryptocurrencyDetailsCurrentFiat$ = this.store
      .select(CryptocurrencyState.cryptocurrencyDetails)
      .pipe(map(filterFn => filterFn(this.selectedSymbol, this.currentFiat)));

    this.cryptocurrencyDetailsBtc$ = this.store
      .select(CryptocurrencyState.cryptocurrencyDetails)
      .pipe(map(filterFn => filterFn(this.selectedSymbol, this.BTC)))
  }

}

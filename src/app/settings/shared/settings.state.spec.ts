import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SettingsState } from 'app/settings/shared/settings.state';
import { FiatCurrency } from 'app/settings/settings/shared/fiat-currency.enum';
import { SetActiveFiatCurrency } from 'app/settings/shared/settings.actions';

describe('SettingsState', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SettingsState])],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  it('EUR is default fiat currency', () => {
    const val = store.selectSnapshot(SettingsState.activeFiatCurrency);
    expect(val).toBe(FiatCurrency.EUR);
  });

  it('active fiat currency updates to USD', () => {
    store.dispatch(new SetActiveFiatCurrency(FiatCurrency.USD));
    const val = store.selectSnapshot(SettingsState.activeFiatCurrency);
    expect(val).toBe(FiatCurrency.USD);
  });
});

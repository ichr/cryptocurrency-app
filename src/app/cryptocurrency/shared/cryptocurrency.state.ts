import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CryptocurrencyObject } from './models/cryptocurrency-object.model';
import { FetchCryptocurrencyList } from './cryptocurrency.actions';
import { CoinMarketCapService } from './coin-market-cap.service';
import { tap } from 'rxjs/operators';

export interface CryptocurrencyStateModel {
  list: CryptocurrencyObject[];
}

@State<CryptocurrencyStateModel>({
  name: 'cryptocurrency',
  defaults: {
    list: null
  }
})
export class CryptocurrencyState {

  constructor(private coinMarketCapService: CoinMarketCapService) {
  }

  @Selector()
  static cryptocurrencies(state: CryptocurrencyStateModel) {
    return state.list;
  }

  @Action(FetchCryptocurrencyList, { cancelUncompleted: true })
  fetchCryptocurrencyList(context: StateContext<CryptocurrencyStateModel>, action: FetchCryptocurrencyList) {
    const currentList = context.getState().list;

    if (currentList && currentList.length >= 0) {
      return;
    }

    return this.coinMarketCapService
      .getListingsLatest(action.start, action.limit, action.convert)
      .pipe(tap(res => {
        context.patchState({
          list: res
        })
      }));
  }
}

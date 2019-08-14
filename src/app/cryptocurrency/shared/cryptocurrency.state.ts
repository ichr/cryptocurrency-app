import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CryptocurrencyObject } from './models/cryptocurrency-object.model';
import { FetchCryptocurrencyList } from './cryptocurrency.actions';
import { CoinMarketCapService } from './coin-market-cap.service';
import { tap } from 'rxjs/operators';

export interface CryptocurrencyStateModel {
  /**
   * Map for `convert` fiat currency
   */
  listMap: Map<string, CryptocurrencyObject[]>;
}

@State<CryptocurrencyStateModel>({
  name: 'cryptocurrency',
  defaults: {
    listMap: new Map<string, CryptocurrencyObject[]>()
  }
})
export class CryptocurrencyState {

  constructor(private coinMarketCapService: CoinMarketCapService) {
  }

  @Selector()
  static cryptocurrencyList(state: CryptocurrencyStateModel) {
    return (convert: string) => {
      return state.listMap.get(convert);
    };
  }

  @Action(FetchCryptocurrencyList, { cancelUncompleted: true })
  fetchCryptocurrencyList(context: StateContext<CryptocurrencyStateModel>, action: FetchCryptocurrencyList) {
    const currentListMap = context.getState().listMap;

    if (!action.force && currentListMap && currentListMap.has(action.convert)) {
      console.debug("Found existing list for convert: ", action.convert);
      return;
    }

    return this.coinMarketCapService
      .getListingsLatest(action.start, action.limit, action.convert)
      .pipe(tap(res => {
        const newMap = new Map(currentListMap);
        newMap.set(action.convert, res);

        context.patchState({
          listMap: newMap
        });
      }));
  }
}

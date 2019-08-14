import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CryptocurrencyObject } from './models/cryptocurrency-object.model';
import { FetchCryptocurrencyDetail, FetchCryptocurrencyList } from './cryptocurrency.actions';
import { CoinMarketCapService } from './coin-market-cap.service';
import { tap } from 'rxjs/operators';

export interface CryptocurrencyStateModel {
  /**
   * Map for `convert` fiat currency
   */
  listMap: Map<string, CryptocurrencyObject[]>;

  /**
   * Map for Cryptocurrency symbol and convert pairs.
   * Example map key for LTC in EUR conversion: `LTC_EUR`
   */
  detailsMap: Map<string, CryptocurrencyObject>;
}

@State<CryptocurrencyStateModel>({
  name: 'cryptocurrency',
  defaults: {
    listMap: new Map<string, CryptocurrencyObject[]>(),
    detailsMap: new Map<string, CryptocurrencyObject>()
  }
})
export class CryptocurrencyState {

  private static createMapKey(symbol: string, convert: string): string {
    return `${symbol}_${convert}`;
  }

  constructor(private coinMarketCapService: CoinMarketCapService) {
  }

  @Selector()
  static cryptocurrencyList(state: CryptocurrencyStateModel) {
    return (convert: string) => {
      return state.listMap.get(convert);
    };
  }

  @Selector()
  static cryptocurrencyDetails(state: CryptocurrencyStateModel) {
    return (symbol: string, convert: string) => {
      return state.detailsMap.get(CryptocurrencyState.createMapKey(symbol, convert));
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

  @Action(FetchCryptocurrencyDetail, { cancelUncompleted: true })
  fetchCryptocurrencyDetail(context: StateContext<CryptocurrencyStateModel>, action: FetchCryptocurrencyDetail) {
    const currentDetailsMap = context.getState().detailsMap;
    const detailsMapKey = CryptocurrencyState.createMapKey(action.symbol, action.convert);

    if (!action.force && currentDetailsMap.has(detailsMapKey)) {
      console.debug("Found existing detail for key: ", detailsMapKey);
      return;
    }

    return this.coinMarketCapService
      .getQuotesLatest(action.symbol, action.convert)
      .pipe(tap(res => {
        const newMap = new Map(currentDetailsMap);
        newMap.set(detailsMapKey, res);

        context.patchState({
          detailsMap: newMap
        });
      }));
  }

}

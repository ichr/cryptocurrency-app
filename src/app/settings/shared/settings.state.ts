import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetActiveFiatCurrency } from './settings.actions';
import { FiatCurrency } from '../settings/shared/fiat-currency.enum';

export interface SettingsStateModel {
  activeFiatCurrency: FiatCurrency;
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    activeFiatCurrency: FiatCurrency.EUR
  }
})
export class SettingsState {

  @Selector()
  static activeFiatCurrency(state: SettingsStateModel) {
    return state.activeFiatCurrency;
  }

  @Action(SetActiveFiatCurrency)
  setActiveFiatCurrency(context: StateContext<SettingsStateModel>, action: SetActiveFiatCurrency) {
    context.patchState({
      activeFiatCurrency: action.currency
    });
  }

}

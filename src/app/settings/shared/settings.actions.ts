import { FiatCurrency } from '../settings/shared/fiat-currency.enum';

export class SetActiveFiatCurrency {
  static readonly type = '[Settings] SetActiveFiatCurrency';
  constructor(public currency: FiatCurrency) {}
}

import { QuoteValue } from './quote-value.model';
import { Deserializable } from 'app/core/models/deserializable.interface';
import { QuoteMap } from './quote-map.interface';

export class CryptocurrencyObject implements Deserializable<CryptocurrencyObject> {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: number;
  last_updated: Date;
  quote: QuoteMap;

  getQuoteForCurrency(currency: string): QuoteValue {
    return this.quote[currency];
  }

  deserialize(object: any): CryptocurrencyObject {
    Object.assign(this, object);
    return this;
  }
}

import { QuoteValue } from './quote-value.model';
import { Deserializable } from '../../../core/models/deserializable.interface';

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
  quote: Map<string, QuoteValue>;

  deserialize(object: any): CryptocurrencyObject {
    Object.assign(this, object);
    return this;
  }
}

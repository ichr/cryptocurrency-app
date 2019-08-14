import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CryptocurrencyState } from 'app/cryptocurrency/shared/cryptocurrency.state';
import { CoinMarketCapService } from 'app/cryptocurrency/shared/coin-market-cap.service';
import { FetchCryptocurrencyList } from 'app/cryptocurrency/shared/cryptocurrency.actions';
import { of } from 'rxjs';

const fixtureCcList = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    slug: 'bitcoin',
    num_market_pairs: 7807,
    date_added: new Date('2013-04-28T00:00:00.000Z'),
    tags: [
      'mineable'
    ],
    max_supply: 21000000,
    circulating_supply: 17876162,
    total_supply: 17876162,
    cmc_rank: 1,
    last_updated: new Date('2019-08-14T16:00:33.000Z'),
    quote: {
      EUR: {
        price: 9422.982928276262,
        volume_24h: 15748864390.000538,
        percent_change_1h: 0.0424,
        percent_change_24h: -4.1765,
        percent_change_7d: -10.8172,
        market_cap: 168446769349.10083,
        last_updated: new Date('2019-08-14T16:01:00.000Z')
      }
    }
  },
  {
    id: 1027,
    name: 'Ethereum',
    symbol: 'ETH',
    slug: 'ethereum',
    num_market_pairs: 5534,
    date_added: new Date('2015-08-07T00:00:00.000Z'),
    tags: [
      'mineable'
    ],
    max_supply: null,
    circulating_supply: 107318983.0615,
    total_supply: 107318983.0615,
    platform: null,
    cmc_rank: 2,
    last_update: new Date('2019-08-14T16:01:23.000Z'),
    quote: {
      EUR: {
        price: 184.41265222807334,
        volume_24h: 5289952425.816023,
        percent_change_1h: 0.2788,
        percent_change_24h: -0.5568,
        percent_change_7d: -8.9655,
        market_cap: 19790978300.790894,
        last_updated: new Date('2019-08-14T16:01:00.000Z')
      }
    }
  },
  {
    id: 52,
    name: 'XRP',
    symbol: 'XRP',
    slug: 'ripple',
    num_market_pairs: 439,
    date_added: new Date('2013-08-04T00:00:00.000Z'),
    tags: [],
    max_supply: 100000000000,
    circulating_supply: 42890708341,
    total_supply: 99991376954,
    platform: null,
    cmc_rank: 3,
    last_updated: new Date('2019-08-14T16:01:04.000Z'),
    quote: {
      EUR: {
        price: 0.26143263462400845,
        volume_24h: 785840969.6609272,
        percent_change_1h: 0.122,
        percent_change_24h: -1.1852,
        percent_change_7d: -6.3474,
        market_cap: 11213030882.477566,
        last_updated: new Date('2019-08-14T16:01:00.000Z')
      }
    }
  }
];

describe('CryptocurrencyState', () => {
  let store: Store;
  let coinMarketCapServiceSpy;

  beforeEach(async(() => {
    coinMarketCapServiceSpy = jasmine.createSpyObj('CoinMarketCapService', ['getListingsLatest']);

    coinMarketCapServiceSpy.getListingsLatest.and.returnValue(of(fixtureCcList));

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CryptocurrencyState])],
      providers: [
        { provide: CoinMarketCapService, useValue: coinMarketCapServiceSpy }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  it('fetch list should work', () => {
    store.dispatch(new FetchCryptocurrencyList(1, 3, 'EUR', false));
    const val = store.selectSnapshot(s => s.cryptocurrency.listMap);
    expect(val.has('EUR')).toBe(true);
    expect(val.size).toBe(1);
  });
});

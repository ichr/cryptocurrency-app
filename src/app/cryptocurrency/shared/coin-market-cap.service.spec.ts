import { TestBed } from '@angular/core/testing';
import { CoinMarketCapService } from 'app/cryptocurrency/shared/coin-market-cap.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CoinMarketCapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: CoinMarketCapService = TestBed.get(CoinMarketCapService);
    expect(service).toBeTruthy();
  });
});

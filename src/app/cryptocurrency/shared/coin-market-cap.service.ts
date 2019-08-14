import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptocurrencyObject } from './models/cryptocurrency-object.model';
import { ResponseSchema } from './models/response-schema.model';

@Injectable({
  providedIn: 'root'
})
export class CoinMarketCapService {

  private readonly API_KEY = '63a3c784-d81b-4c75-8882-150fb92ac49b';

  private readonly baseUrl = '/api/coinmarketcap/v1';

  constructor(private http: HttpClient) { }

  getListingsLatest(start: number, limit: number, convert: string): Observable<CryptocurrencyObject[]> {
    const headers = {
      'X-CMC_PRO_API_KEY': this.API_KEY
    };
    const params = {
      start: start.toString(),
      limit: limit.toString(),
      convert
    };

    return this.http
      .get<ResponseSchema<CryptocurrencyObject[]>>(`${this.baseUrl}/cryptocurrency/listings/latest`, {headers, params})
      .pipe(
        map( (response: ResponseSchema<CryptocurrencyObject[]>) => {
          return response.data.map(item => new CryptocurrencyObject().deserialize(item));
        })
      );
  }
}

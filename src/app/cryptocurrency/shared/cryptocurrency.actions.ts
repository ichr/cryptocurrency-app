export class FetchCryptocurrencyList {
  static readonly type = '[Cryptocurrency] FetchCryptocurrencyList';
  constructor(public start: number,
              public limit: number,
              public convert: string,
              /**
               * To force reload data from server
               */
              public force: boolean
  ) {}
}

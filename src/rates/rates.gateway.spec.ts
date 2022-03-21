import { HttpModule, HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { Rate } from '../interfaces/rate.interface';
import { RatesGateway } from './rates.gateway';
import { AxiosResponse } from 'axios';

describe('RatesGateway', () => {
  let ratesGateway: RatesGateway;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RatesGateway],
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
    ratesGateway = moduleRef.get<RatesGateway>(RatesGateway);
  });

  describe('getRate', () => {
    it('should return the rate of a currency pair', async () => {
      const pair = 'BTC-USD';
      const result: Rate = {
        ask: '500',
        bid: '500',
        currency: 'USD',
      };

      jest.spyOn(httpService, 'get').mockImplementation(
        () =>
          new Observable<AxiosResponse<Rate, any>>((subscriber) => {
            subscriber.next({
              data: result,
              status: 200,
              statusText: 'OK',
              headers: {},
              config: {},
              request: {},
            });
            subscriber.complete();
          }),
      );

      expect(await ratesGateway.getRate(pair)).toBe(result);
    });
  });
});

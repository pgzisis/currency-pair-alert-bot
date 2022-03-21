import { Test } from '@nestjs/testing';
import { Rate } from '../interfaces/rate.interface';
import { RatesGateway } from './rates.gateway';
import { RatesService } from './rates.service';
import { Cache } from 'cache-manager';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

describe('RatesService', () => {
  let cacheManager: Cache;
  let ratesGateway: RatesGateway;
  let ratesService: RatesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, CacheModule.register()],
      providers: [RatesService, RatesGateway],
    }).compile();

    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
    ratesGateway = moduleRef.get<RatesGateway>(RatesGateway);
    ratesService = moduleRef.get<RatesService>(RatesService);
  });

  const pair = 'BTC-USD';
  const result: Rate = {
    ask: '500',
    bid: '500',
    currency: 'USD',
  };

  describe('getPreviousRate', () => {
    it('should return the cached rate of a currency pair', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(result);

      expect(await ratesService.getPreviousRate(pair)).toBe(result);
    });
  });

  describe('getCurrentRate', () => {
    it('should return the current rate of a currency pair', async () => {
      jest.spyOn(ratesGateway, 'getRate').mockResolvedValue(result);

      expect(await ratesService.getCurrentRate(pair)).toBe(result);
    });
  });

  describe('saveRate', () => {
    it('should save the current rate of a currency pair to the cache', async () => {
      jest.spyOn(cacheManager, 'set').mockImplementation(undefined);

      expect(await ratesService.saveRate(pair, result)).toBe(undefined);
    });
  });
});

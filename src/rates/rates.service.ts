import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';
import { Rate } from '../interfaces/rate.interface';
import { RatesGateway } from './rates.gateway';

@Injectable()
export class RatesService {
  public constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly ratesGateway: RatesGateway,
  ) {}

  private cachingConfig: CachingConfig = { ttl: 0 };

  public async getPreviousRate(pair: string): Promise<Rate> {
    return await this.cacheManager.get(pair);
  }

  public async getLatestRate(pair: string): Promise<Rate> {
    return await this.ratesGateway.getRate(pair);
  }

  public async saveLatestRate(pair: string, rate: Rate): Promise<void> {
    await this.cacheManager.set(pair, rate, this.cachingConfig);
  }
}

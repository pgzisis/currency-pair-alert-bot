import { Injectable } from '@nestjs/common';
import { Ticker } from '../interfaces/ticker.interface';
import { UpholdService } from './uphold.service';

@Injectable()
export class TickersService {
  public constructor(private readonly upholdService: UpholdService) {}

  public async getTicker(pair: string): Promise<Ticker> {
    return await this.upholdService.getTicker(pair);
  }
}

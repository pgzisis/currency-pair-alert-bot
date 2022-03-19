import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TickersService } from './tickers.service';

@Injectable()
export class AlertsService {
  public constructor(private readonly tickersService: TickersService) {}

  private readonly logger = new Logger(AlertsService.name);

  @Cron(process.env.CRON_EXPRESSION ?? CronExpression.EVERY_5_SECONDS)
  public async handleCron(): Promise<void> {
    const ticker = await this.tickersService.getTicker('BTC-USD');

    this.logger.log(ticker);
  }
}

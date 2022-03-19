import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RatesGateway } from '../rates/rates.gateway';

@Injectable()
export class AlertsService {
  public constructor(private readonly ratesGateway: RatesGateway) {}

  private readonly logger = new Logger(AlertsService.name);

  @Cron(process.env.CRON_EXPRESSION ?? CronExpression.EVERY_5_SECONDS)
  public async handleCron(): Promise<void> {
    const rate = await this.ratesGateway.getRate('BTC-USD');

    this.logger.log(rate);
  }
}

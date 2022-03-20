import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Calculator } from '../rates/calculator';
import { RatesService } from '../rates/rates.service';

@Injectable()
export class AlertsService {
  public constructor(private readonly ratesService: RatesService) {}

  private readonly logger = new Logger(AlertsService.name);

  @Cron(process.env.CRON_EXPRESSION ?? CronExpression.EVERY_5_SECONDS)
  public async handleCron(): Promise<void> {
    const pair = process.env.PAIR ?? 'BTC-USD';
    const [latestRate, previousRate] = await Promise.all([
      this.ratesService.getLatestRate(pair),
      this.ratesService.getPreviousRate(pair),
    ]);

    if (previousRate) {
      const calculator = new Calculator(previousRate, latestRate);

      if (calculator.isChangeSignificant()) {
        const alertMessage = this.createAlertMessage(
          pair,
          calculator.calculatePercentageChange(),
          previousRate.ask,
          latestRate.ask,
          latestRate.currency,
        );

        this.logger.log(alertMessage);
      }
    }

    await this.ratesService.saveLatestRate(pair, latestRate);
  }

  private createAlertMessage(
    pair: string,
    percentageChange: number,
    previousAsk: string,
    latestAsk: string,
    currency: string,
  ): string {
    return `${pair} oscillation ${percentageChange}%: ${previousAsk} ${currency} --> ${latestAsk} ${currency}`;
  }
}

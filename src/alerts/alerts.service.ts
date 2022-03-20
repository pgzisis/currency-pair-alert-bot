import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculator } from '../rates/calculator';
import { RatesService } from '../rates/rates.service';
import { Alert } from './alert.entity';

@Injectable()
export class AlertsService {
  public constructor(
    private readonly ratesService: RatesService,
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>,
  ) {}

  private readonly logger = new Logger(AlertsService.name);

  @Cron(process.env.FETCH_INTERVAL ?? CronExpression.EVERY_5_SECONDS)
  public async handleCron(): Promise<void> {
    const pairs = this.parsePairs();

    await Promise.all(pairs.map((pair) => this.handlePair(pair)));
  }

  private parsePairs(): string[] {
    return (
      process.env.CURRENCY_PAIRS.split(',') ?? ['BTC-USD', 'ETH-USD', 'LTC-USD']
    );
  }

  private async handlePair(pair: string): Promise<void> {
    const [currentRate, previousRate] = await Promise.all([
      this.ratesService.getCurrentRate(pair),
      this.ratesService.getPreviousRate(pair),
    ]);

    if (previousRate) {
      const calculator = new Calculator(previousRate, currentRate);
      const percentageChange = calculator.calculatePercentageChange();

      if (calculator.isChangeSignificant()) {
        const alertMessage = this.createAlertMessage(
          pair,
          percentageChange,
          previousRate.ask,
          currentRate.ask,
          currentRate.currency,
        );

        this.logger.log(alertMessage);

        await Promise.all([
          this.alertsRepository.save({
            pair,
            previousRate,
            currentRate,
            percentageChange,
          }),
          this.ratesService.saveRate(pair, currentRate),
        ]);
      }
    } else {
      await this.ratesService.saveRate(pair, currentRate);
    }
  }

  private createAlertMessage(
    pair: string,
    percentageChange: number,
    previousAsk: string,
    currentAsk: string,
    currency: string,
  ): string {
    return `${pair} ${percentageChange}%: ${previousAsk} ${currency} --> ${currentAsk} ${currency}`;
  }
}

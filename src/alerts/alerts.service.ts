import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  @Cron(process.env.CRON_EXPRESSION ?? CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.log('Hi');
  }
}

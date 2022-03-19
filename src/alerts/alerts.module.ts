import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { RatesModule } from '../rates/rates.module';

@Module({
  imports: [RatesModule],
  providers: [AlertsService],
})
export class AlertsModule {}

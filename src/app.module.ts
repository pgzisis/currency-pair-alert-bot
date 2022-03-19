import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertsModule } from './alerts/alerts.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [ScheduleModule.forRoot(), AlertsModule, RatesModule],
})
export class AppModule {}

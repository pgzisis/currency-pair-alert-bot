import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AlertsService } from './services/alerts.service';
import { TickersService } from './services/tickers.service';
import { ObservableConverterService } from './services/observableConverter.service';
import { UpholdService } from './services/uphold.service';

@Module({
  imports: [HttpModule],
  providers: [
    AlertsService,
    TickersService,
    ObservableConverterService,
    UpholdService,
  ],
})
export class AlertsModule {}

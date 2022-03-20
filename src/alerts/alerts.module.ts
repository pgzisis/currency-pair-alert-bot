import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { RatesModule } from '../rates/rates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';

@Module({
  imports: [RatesModule, TypeOrmModule.forFeature([Alert])],
  providers: [AlertsService],
})
export class AlertsModule {}

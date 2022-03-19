import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RatesGateway } from '../rates/rates.gateway';

@Module({
  imports: [HttpModule],
  providers: [RatesGateway],
  exports: [RatesGateway],
})
export class RatesModule {}

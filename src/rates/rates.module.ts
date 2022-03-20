import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RatesGateway } from '../rates/rates.gateway';
import { RatesService } from './rates.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [RatesService, RatesGateway],
  exports: [RatesService],
})
export class RatesModule {}

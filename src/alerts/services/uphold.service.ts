import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Ticker } from '../interfaces/ticker.interface';
import { ObservableConverterService } from './observableConverter.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class UpholdService {
  public constructor(
    private readonly httpService: HttpService,
    private readonly observableConverterService: ObservableConverterService,
  ) {}

  private readonly baseURL = 'https://api.uphold.com/v0/ticker/';

  public async getTicker(pair: string): Promise<Ticker> {
    const url = this.createURL(pair);
    const $source = this.httpService.get<Ticker>(url);
    const response = await this.observableConverterService.toPromise<
      AxiosResponse<Ticker, any>
    >($source);

    return response.data;
  }

  private createURL(pair: string): string {
    return this.baseURL + pair;
  }
}

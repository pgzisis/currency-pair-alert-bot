import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Rate } from '../interfaces/rate.interface';
import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class RatesGateway {
  public constructor(private readonly httpService: HttpService) {}

  private readonly baseURL = 'https://api.uphold.com/v0/ticker/';

  public async getRate(pair: string): Promise<Rate> {
    const url = this.createURL(pair);
    const $source = this.httpService.get<Rate>(url);
    const response = await this.convertObservableToPromise<
      AxiosResponse<Rate, any>
    >($source);

    return response.data;
  }

  private createURL(pair: string): string {
    return this.baseURL + pair;
  }

  private async convertObservableToPromise<T>(
    $source: Observable<T>,
  ): Promise<T> {
    return await lastValueFrom($source);
  }
}

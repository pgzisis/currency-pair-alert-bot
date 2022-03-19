import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class ObservableConverterService {
  public async toPromise<T>($source: Observable<T>): Promise<T> {
    return await lastValueFrom($source);
  }
}

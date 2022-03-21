import { Test } from '@nestjs/testing';
import { Rate } from '../interfaces/rate.interface';
import { RatesService } from '../rates/rates.service';
import { Alert } from './alert.entity';
import { AlertsService } from './alerts.service';
import { RatesModule } from '../rates/rates.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AlertsService', () => {
  let ratesService: RatesService;
  let alertsService: AlertsService;
  let alertsRepository: Repository<Alert>;

  beforeAll(() => {
    process.env.CURRENCY_PAIRS = 'BTC-USD,ETH-USD,LTC-USD';
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RatesModule],
      providers: [
        AlertsService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    ratesService = moduleRef.get<RatesService>(RatesService);
    alertsRepository = moduleRef.get<Repository<Alert>>(
      getRepositoryToken(Alert),
    );
    alertsService = moduleRef.get<AlertsService>(AlertsService);
  });

  describe('handleCron', () => {
    const previousRate: Rate = {
      ask: '500',
      bid: '500',
      currency: 'USD',
    };
    const currentRate: Rate = {
      ask: '1000',
      bid: '1000',
      currency: 'USD',
    };

    it('should save an alert when there is significant change', async () => {
      jest.spyOn(ratesService, 'getCurrentRate').mockResolvedValue(currentRate);
      jest
        .spyOn(ratesService, 'getPreviousRate')
        .mockResolvedValue(previousRate);
      const alertsRepositorySpy = jest.spyOn(alertsRepository, 'save');

      await alertsService.handleCron();

      expect(alertsRepositorySpy).toHaveBeenCalled();
    });

    it('should save an alert when there is significant change and there are no currency pairs supplied', async () => {
      process.env.CURRENCY_PAIRS = '';
      jest.spyOn(ratesService, 'getCurrentRate').mockResolvedValue(currentRate);
      jest
        .spyOn(ratesService, 'getPreviousRate')
        .mockResolvedValue(previousRate);
      const alertsRepositorySpy = jest.spyOn(alertsRepository, 'save');

      await alertsService.handleCron();

      expect(alertsRepositorySpy).toHaveBeenCalled();
    });

    it('should not save an alert when there is no significant change', async () => {
      jest
        .spyOn(ratesService, 'getCurrentRate')
        .mockResolvedValue(previousRate);
      jest
        .spyOn(ratesService, 'getPreviousRate')
        .mockResolvedValue(previousRate);
      const alertsRepositorySpy = jest.spyOn(alertsRepository, 'save');

      await alertsService.handleCron();

      expect(alertsRepositorySpy).toHaveBeenCalledTimes(0);
    });

    it('should not save an alert when there is not previousRate saved', async () => {
      jest.spyOn(ratesService, 'getCurrentRate').mockResolvedValue(currentRate);
      jest.spyOn(ratesService, 'getPreviousRate').mockResolvedValue(undefined);
      const alertsRepositorySpy = jest.spyOn(alertsRepository, 'save');

      await alertsService.handleCron();

      expect(alertsRepositorySpy).toHaveBeenCalledTimes(0);
    });
  });
});
